import { H3 } from "h3";
import { HuabClient, BACKENDS } from "@huab/lib";

const client = new HuabClient();

export const server = new H3()
  // GET /flatpak/packages — list all Flatpak packages (installed + available)
  .get("/flatpak/packages", async () => {
    return client.listAvailable(BACKENDS.flatpak);
  })
  // GET /packages — list packages across all backends
  .get("/packages", async () => {
    return client.listAllAvailable();
  });
