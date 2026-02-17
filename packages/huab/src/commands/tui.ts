import { cmd } from "@/utils";

export const TuiCommand = cmd({
  command: "$0",
  describe: "start huab tui",
  handler: async () => {
    await import("../tui/app.tsx");
  },
});
