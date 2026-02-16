#!/usr/bin/env node
import { createCli } from "./cli.ts";

const cli = createCli();

cli
  .parseAsync()
  .then(() => {
    // Force exit: copy-paste library spawns child processes (pbcopy/xclip/clip),
    // which keeps Node's event loop alive even after the command completes successfully
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

