import { $ } from "bun";
import packageJson from "../package.json";

const VERSION = packageJson.version;
const NAME = packageJson.name;

const targets = [
  "bun-darwin-arm64",
  "bun-darwin-x64",
  "bun-linux-x64",
  "bun-linux-arm64",
  "bun-windows-x64",
] as const;

const parseTargets = () => {
  const raw = process.env.HUAB_TARGETS?.trim();
  if (!raw) return targets;
  const requested = raw
    .split(",")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
  const unknown = requested.filter(
    (entry) => !targets.includes(entry as (typeof targets)[number]),
  );
  if (unknown.length) {
    console.error(`[huab] Unknown build targets: ${unknown.join(", ")}`);
    process.exit(1);
  }
  return targets.filter((target) => requested.includes(target));
};

const outputNames: Record<(typeof targets)[number], string> = {
  "bun-darwin-arm64": "huab-darwin-arm64",
  "bun-darwin-x64": "huab-darwin-x64",
  "bun-linux-x64": "huab-linux-x64",
  "bun-linux-arm64": "huab-linux-arm64",
  "bun-windows-x64": "huab-windows-x64.exe",
};

async function main() {
  const buildTargets = parseTargets();
  
  // Only install cross-platform dependencies if explicitly building for multiple platforms
  const shouldInstallCrossPlatform = 
    process.env.HUAB_INSTALL_CROSS_PLATFORM === "true" ||
    (buildTargets.length === targets.length && !process.env.HUAB_TARGETS);
  
  if (shouldInstallCrossPlatform) {
    const opentuiCoreVersion = packageJson.dependencies["@opentui/core"];
    console.log("Installing opentui for all platforms...");
    console.log("(Skip this with HUAB_INSTALL_CROSS_PLATFORM=false or specify HUAB_TARGETS)");
    await $`bun install --os="*" --cpu="*" @opentui/core@${opentuiCoreVersion}`;
    console.log("Done installing opentui for all platforms");
  } else {
    console.log("Skipping cross-platform dependency installation");
    console.log("(Use HUAB_INSTALL_CROSS_PLATFORM=true to enable)");
  }

  await Bun.file("dist").exists().catch(() => false);
  await $`mkdir -p dist`;

  for (const target of buildTargets) {
    const outfile = `dist/${outputNames[target]}`;
    console.log(`Building ${target} -> ${outfile} (v${VERSION})`);
    const result = await Bun.build({
      entrypoints: ["src/bin.ts"],
      target: "bun",
      define: {
        __VERSION__: JSON.stringify(VERSION),
        __NAME__: JSON.stringify(NAME),
      },
      compile: {
        target,
        outfile,
        // Disable bunfig.toml autoloading
        autoloadBunfig: false,
      },
    });
    if (!result.success) {
      console.error(`Build failed for ${target}:`, result.logs);
      process.exit(1);
    }
  }

  console.log("Done building all targets");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

