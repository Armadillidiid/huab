#!/usr/bin/env bun

import { $ } from "bun";
import path from "path";

import { createClient } from "@hey-api/openapi-ts";

const dir = new URL(".", import.meta.url).pathname;

// Generate OpenAPI spec
await $`bun run gen:openapi > ${dir}/openapi.json`.cwd(
  path.resolve(dir, "../../huab/"),
);

// Create TS client
await createClient({
  input: "./openapi.json",
  output: {
    path: "./src/gen",
    tsConfigPath: path.join(dir, "tsconfig.json"),
    clean: true,
  },
  plugins: [
    {
      name: "@hey-api/typescript",
      exportFromIndex: false,
    },
    // {
    //   name: "@hey-api/sdk",
    //   instance: "HuabClient",
    //   exportFromIndex: false,
    //   auth: false,
    //   paramsStructure: "flat",
    // },
    {
      name: "@hey-api/client-fetch",
      exportFromIndex: false,
      baseUrl: "http://localhost:4096",
    },
  ],
});

// TODO: format openapi spec
