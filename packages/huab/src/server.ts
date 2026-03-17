import { H3 } from "h3";
import { BACKENDS, type FlatpakPackage, HuabClient } from "@huab/lib";
import {
  getFlatpakPackagesCached,
  refreshFlatpakPackages,
} from "./cache/flatpak-list-cache.ts";
import { subscribeEvent } from "./events/event-bus.ts";

const client = new HuabClient();

async function loadFlatpakPackages(): Promise<FlatpakPackage[]> {
  const packages = await client.listAvailable(BACKENDS.flatpak);
  return packages;
}

export const server = new H3()
  .get("/flatpak/packages", async () => {
    const result = await getFlatpakPackagesCached(loadFlatpakPackages);
    return result.packages;
  })
  .post("/flatpak/packages/refresh", async () => {
    await refreshFlatpakPackages(loadFlatpakPackages);
    return { ok: true as const };
  })
  // GET /packages — list packages across all backends
  .get("/packages", async () => {
    return client.listAllAvailable();
  })
  .get("/events", async () => {
    const encoder = new TextEncoder();
    let eventId = 0;
    let unsubscribe: (() => void) | undefined;
    let heartbeat: ReturnType<typeof setInterval> | undefined;

    const writeEvent = (
      controller: ReadableStreamDefaultController<Uint8Array>,
      type: string,
      payload: unknown,
    ) => {
      eventId += 1;
      controller.enqueue(
        encoder.encode(
          `id: ${eventId}\nevent: ${type}\ndata: ${JSON.stringify(payload)}\n\n`,
        ),
      );
    };

    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        writeEvent(controller, "system.heartbeat", {
          type: "system.heartbeat",
          ts: new Date().toISOString(),
        });

        unsubscribe = subscribeEvent((event) => {
          writeEvent(controller, event.type, event);
        });

        heartbeat = setInterval(() => {
          writeEvent(controller, "system.heartbeat", {
            type: "system.heartbeat",
            ts: new Date().toISOString(),
          });
        }, 15_000);
      },
      cancel() {
        unsubscribe?.();
        if (heartbeat) clearInterval(heartbeat);
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  });
