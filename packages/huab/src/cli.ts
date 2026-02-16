import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { NAME, VERSION } from "./constants.ts";

export function createCli() {
  return yargs(hideBin(process.argv))
    .scriptName(NAME)
    .version(VERSION)
    .command(
      "configure",
      "Configure the application",
      () => {},
      () => {
        console.log(
          "This is an example command. You can replace this with your actual command implementation.",
        );
      },
    )
    .demandCommand(0, "")
    .epilogue(`${NAME} v${VERSION}. Run ${NAME} --help for more information.`)
    .help()
    .alias("h", "help")
    .alias("v", "version");
}
