import { H3 } from "h3";
import { HuabClient } from "@huab/lib";

const client = new HuabClient();

export const server = new H3()
  // GET /flatpak/packages — list all installed Flatpak apps
  .get("/flatpak/packages", async () => {
    return client.listInstalled();
  })
  // GET /flatpak/updates — list available Flatpak updates
  .get("/flatpak/updates", async () => {
    return client.listUpdates();
  });

// Trigger list apps
const res = await server.request("/flatpak/packages");
console.log("Installed Flatpak apps:", res);
