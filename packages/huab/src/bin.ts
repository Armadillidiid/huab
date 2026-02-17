#!/usr/bin/env bun
import { createCli } from "./cli.ts";

const cli = createCli();

cli
  .parseAsync()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
