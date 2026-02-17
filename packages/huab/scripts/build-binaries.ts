#!/usr/bin/env bun

import { $ } from "bun";
import path from "path";
import { fileURLToPath } from "url";
import packageJson from "../package.json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir = path.resolve(__dirname, "..");

process.chdir(dir);

const VERSION = packageJson.version;
const NAME = packageJson.name;

// Parse command line flags
const singleFlag = process.argv.includes("--single");
const skipInstall = process.argv.includes("--skip-install");

const allTargets = [
  { os: "linux", arch: "arm64" },
  { os: "linux", arch: "x64" },
  { os: "darwin", arch: "arm64" },
  { os: "darwin", arch: "x64" },
  { os: "windows", arch: "x64" },
] as const;

// Filter targets based on flags
const targets = singleFlag
  ? allTargets.filter(
      (item) =>
        // Map Windows since process.platform returns 'win32'
        item.os ===
          (process.platform === "win32" ? "windows" : process.platform) &&
        item.arch === process.arch,
    )
  : allTargets;

const getBunTarget = (item: (typeof allTargets)[number]) => {
  return `bun-${item.os}-${item.arch}` as const;
};

const getOutputName = (item: (typeof allTargets)[number]) => {
  const name = [NAME, item.os, item.arch].join("-");

  // Add .exe extension for Windows
  return item.os === "windows" ? `${name}.exe` : name;
};

async function main() {
  // Install cross-platform dependencies
  if (!skipInstall) {
    const opentuiCoreVersion = packageJson.dependencies["@opentui/core"];
    console.log("Installing opentui for all platforms...");
    await $`bun install --os="*" --cpu="*" @opentui/core@${opentuiCoreVersion}`;
    console.log("Done installing opentui for all platforms");
  } else {
    console.log("Skipping dependency installation (--skip-install)");
  }

  // Clean and create dist directory
  await $`rm -rf dist`;
  await $`mkdir -p dist`;

  const binaries: Record<string, string> = {};

  for (const item of targets) {
    const platformName = [NAME, item.os, item.arch].join("-");

    const bunTarget = getBunTarget(item);
    const outputName = getOutputName(item);

    console.log(`Building ${platformName} (${bunTarget})`);

    // Create platform-specific directory structure
    await $`mkdir -p dist/${platformName}/bin`;

    const result = await Bun.build({
      entrypoints: ["src/bin.ts"],
      target: "bun",
      define: {
        __VERSION__: JSON.stringify(VERSION),
        __NAME__: JSON.stringify(NAME),
      },
      compile: {
        target: bunTarget,
        outfile: `dist/${platformName}/bin/${outputName}`,
        autoloadBunfig: false,
        autoloadDotenv: false,
        autoloadTsconfig: true,
        autoloadPackageJson: true,
      },
    });

    if (!result.success) {
      console.error(`Build failed for ${platformName}:`, result.logs);
      process.exit(1);
    }

    // Create platform-specific package.json
    await Bun.file(`dist/${platformName}/package.json`).write(
      JSON.stringify(
        {
          name: platformName,
          version: VERSION,
          os: [item.os],
          cpu: [item.arch],
        },
        null,
        2,
      ),
    );

    binaries[platformName] = VERSION;
  }

  console.log(`\n✓ Built ${Object.keys(binaries).length} binaries:`);
  Object.keys(binaries).forEach((name) => console.log(`  - ${name}`));
  console.log("\nDone building all targets");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

export {};
