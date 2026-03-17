import type { FlatpakPackage } from "@huab/lib";
import { BACKENDS } from "@huab/lib";
import type { Client } from "@huab/sdk";
import { flatpakListAvailable } from "@huab/sdk/sdk";
import { createInProcessSdkClient } from "../../api/sdk-client.ts";
import { subscribeEvent } from "../../events/event-bus.ts";
import type { HuabEvent } from "../../events/schema.ts";
import { server } from "../../server.ts";
import { createSimpleContext } from "./helper.tsx";

interface SDKContextValue {
  client: Client;
  listFlatpakPackages: () => Promise<FlatpakPackage[]>;
  refreshFlatpakPackages: () => Promise<void>;
  subscribe: (listener: (event: HuabEvent) => void) => () => void;
}

const sdkContext = createSimpleContext<SDKContextValue, Record<string, unknown>>({
  name: "SDK",
  init: () => {
    const client = createInProcessSdkClient(server);
    return {
      client,
      listFlatpakPackages: async () => {
        const result = await flatpakListAvailable({
          client,
          responseStyle: "fields",
          throwOnError: true,
        });
        return result.data.filter(
          (item): item is FlatpakPackage => item.backend === BACKENDS.flatpak,
        );
      },
      refreshFlatpakPackages: async () => {
        await client.post({
          url: "/flatpak/packages/refresh",
          responseStyle: "data",
          throwOnError: true,
          parseAs: "json",
        });
      },
      subscribe: subscribeEvent,
    };
  },
});

export const SDKProvider = sdkContext.provider;
export function useSDK(): SDKContextValue {
  return sdkContext.use();
}
