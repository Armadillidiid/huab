import { IFACE_NAME } from "../constants.ts";

export const MANAGER_IFACE_XML = `
<node>
  <interface name="${IFACE_NAME}">
    <method name="ListAvailable">
      <arg direction="in"  type="s" name="backend"/>
      <arg direction="out" type="s" name="packages"/>
    </method>
    <method name="ListAllAvailable">
      <arg direction="out" type="s" name="packages"/>
    </method>
    <method name="Install">
      <arg direction="in" type="s" name="backend"/>
      <arg direction="in" type="s" name="packageId"/>
    </method>
    <method name="Remove">
      <arg direction="in" type="s" name="backend"/>
      <arg direction="in" type="s" name="packageId"/>
    </method>
    <method name="Update">
      <arg direction="in" type="s" name="backend"/>
      <arg direction="in" type="s" name="packageId"/>
    </method>
    <method name="UpdateBatch">
      <arg direction="in" type="s" name="backend"/>
      <arg direction="in" type="as" name="packageIds"/>
    </method>
  </interface>
</node>`;

/**
 * TypeScript view of the Manager D-Bus interface.
 * All query methods return JSON-encoded strings to avoid issues with complex D-Bus types.
 */
export interface ManagerIface {
  // ── Query ─────────────────────────────────────────────────────────────────
  ListAvailable(backend: string): string; // string -> AnyPackage[]
  ListAllAvailable(): string; // string -> AnyPackage[]

  // ── Mutations ─────────────────────────────────────────────────────────────
  // TODO: Mutations will use the Manager/Transaction paradigm — each call will
  // spawn a transaction object on a well-known D-Bus path that the client can
  // subscribe to for progress signals and a final result. The signatures below
  // are placeholder stubs until the transaction model is fleshed out.
  Install(backend: string, packageId: string): void;
  Remove(backend: string, packageId: string): void;
  Update(backend: string, packageId: string): void;
  UpdateBatch(backend: string, packageIds: string[]): void;
}
