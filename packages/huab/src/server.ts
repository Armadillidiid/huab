import { H3 } from "h3";
import { FlatpakClient } from "@huab/lib";

const flatpak = new FlatpakClient();

export const server = new H3()
  // GET /flatpak/packages — list all installed Flatpak apps
  .get("/flatpak/packages", async () => {
  const res = await flatpak.listInstalled();
  console.log(res)
    return res;
  })
  // GET /flatpak/updates — list available Flatpak updates
  .get("/flatpak/updates", async () => {
    return flatpak.listUpdates();
  });

// Trigger list apps 
const res = await server.request("/flatpak/packages")
console.log("Installed Flatpak apps:", res);
