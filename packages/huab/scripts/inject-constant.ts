import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pkg from "../package.json" with { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const distDir = join(rootDir, "dist");

// Since we're using Bun.build with 'define', the constants are already replaced
// This script is kept for compatibility but may not be needed
console.log(
  `ℹ️  Note: Constants are injected during build via Bun.build 'define' option`,
);
console.log(`   VERSION: ${pkg.version}`);
console.log(`   NAME: ${pkg.name}`);

// List built binaries
try {
  const files = readdirSync(distDir);
  const binaries = files.filter((f) => f.startsWith("huab-"));
  if (binaries.length > 0) {
    console.log(`✓ Built ${binaries.length} binaries:`);
    binaries.forEach((binary) => console.log(`  - ${binary}`));
  }
} catch (error) {
  console.log("⚠️  No binaries found in dist/ (this is okay for dev builds)");
}

