import type { FlatpakPackage } from "@huab/lib";

interface PackageDetailProps {
  pkg: FlatpakPackage | null;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <box flexDirection="row" gap={1} marginBottom={0}>
      <text fg="#666666" width={16}>
        {label}
      </text>
      <text fg="#c0caf5" flexGrow={1}>
        {value}
      </text>
    </box>
  );
}

export function PackageDetail({ pkg }: PackageDetailProps) {
  if (!pkg) {
    return (
      <box
        flexGrow={1}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        border
        borderStyle="rounded"
        borderColor="#2a2a4e"
      >
        <text fg="#444444">Select a package to view details</text>
      </box>
    );
  }

  const displayName = pkg.app_name ?? pkg.name;
  const isInstalled = pkg.installed_version !== null;

  return (
    <box
      flexGrow={1}
      flexDirection="column"
      border
      borderStyle="rounded"
      borderColor="#7aa2f7"
      title={` ${displayName} `}
      padding={1}
      gap={1}
    >
      {/* Summary */}
      {pkg.summary && (
        <box marginBottom={1}>
          <text fg="#a9b1d6">{pkg.summary}</text>
        </box>
      )}

      {/* Meta rows */}
      <box flexDirection="column" gap={0}>
        <Row label="ID" value={pkg.id} />
        <Row label="Version" value={pkg.version} />
        {isInstalled && (
          <Row label="Installed" value={pkg.installed_version!} />
        )}
        <Row label="Branch" value={pkg.branch} />
        <Row label="Arch" value={pkg.arch} />
        {pkg.repo && <Row label="Remote" value={pkg.repo} />}
        {pkg.developer && <Row label="Developer" value={pkg.developer} />}
        {pkg.license && <Row label="License" value={pkg.license} />}
        {pkg.download_size > 0 && (
          <Row label="Download" value={formatBytes(pkg.download_size)} />
        )}
        {pkg.installed_size > 0 && (
          <Row label="Size" value={formatBytes(pkg.installed_size)} />
        )}
      </box>

      {/* Status badges */}
      <box flexDirection="row" gap={2} marginTop={1}>
        <text fg={isInstalled ? "#9ece6a" : "#444444"}>
          {isInstalled ? "● installed" : "○ not installed"}
        </text>
        {pkg.is_floss && <text fg="#7aa2f7">FLOSS</text>}
        {pkg.eol && <text fg="#f7768e">EOL</text>}
      </box>

      {/* Categories */}
      {pkg.categories.length > 0 && (
        <box flexDirection="row" gap={1} flexWrap="wrap">
          {pkg.categories.map((cat) => (
            <text key={cat} fg="#e0af68">
              [{cat}]
            </text>
          ))}
        </box>
      )}
    </box>
  );
}
