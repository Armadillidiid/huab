#!/usr/bin/env bun
import { createCli } from "./cli.ts";

const cli = createCli();

cli.parseAsync().catch((error) => {
  console.error(error);
  process.exit(1);
});
