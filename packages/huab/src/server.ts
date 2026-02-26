import { H3 } from "h3";
import { HuabClient } from "@huab/lib";

const client = new HuabClient();

export const server = new H3()
  // GET /flatpak/packages — list all installed Flatpak apps
  .get("/flatpak/packages", async () => {
    return client.listInstalled("flatpak");
  })
  // GET /flatpak/updates — list available Flatpak updates
  .get("/flatpak/updates", async () => {
    return client.listUpdates("flatpak");
  })
  // GET /packages — list installed packages across all backends
  .get("/packages", async () => {
    return client.listAllInstalled();
  })
  // GET /updates — list available updates across all backends
  .get("/updates", async () => {
    return client.listAllUpdates();
  });

// Trigger list apps
const res = await server.request("/flatpak/packages");
console.log("Installed Flatpak apps:", await res.json());
