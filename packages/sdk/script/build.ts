#!/usr/bin/env bun

import { $ } from "bun";
import path from "path";

import { createClient } from "@hey-api/openapi-ts";

const dir = new URL("..", import.meta.url).pathname;

// Generate OpenAPI spec
await $`bun run gen:openapi > ${dir}/openapi.json`.cwd(path.resolve(dir, "../huab"));

// Create TS client
await createClient({
  input: "./openapi.json",
  output: {
    path: "js/src/gen",
    tsConfigPath: path.join(dir, "tsconfig.json"),
    clean: true,
  },
  plugins: [
    { name: "@hey-api/typescript" },
    {
      name: "@hey-api/sdk",
      auth: false,
      operations: {
        strategy: "single",
        containerName: "HuabSdk",
        methods: "instance",
      },
    },
  ],
});

await $`bun run format`.cwd(dir);
