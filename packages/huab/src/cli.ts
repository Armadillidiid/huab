import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { NAME, VERSION } from "./constants.ts";
import { TuiCommand } from "./commands/tui.ts";
import { WebCommand } from "./commands/web.ts";

export function createCli() {
  return yargs(hideBin(process.argv))
    .scriptName(NAME)
    .version(VERSION)
    .command(TuiCommand)
    .command(WebCommand)
    .epilogue(`${NAME} v${VERSION}. Run ${NAME} --help for more information.`)
    .help()
    .alias("h", "help")
    .alias("v", "version");
}
