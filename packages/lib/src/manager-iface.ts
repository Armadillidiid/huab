import { IFACE_NAME } from './constants.js';

export const MANAGER_IFACE_XML = `
<node>
  <interface name="${IFACE_NAME}">
    <method name="ListInstalled">
      <arg direction="in"  type="s" name="backend"/>
      <arg direction="out" type="s" name="packages"/>
    </method>
    <method name="ListUpdates">
      <arg direction="in"  type="s" name="backend"/>
      <arg direction="out" type="s" name="updates"/>
    </method>
    <method name="ListAllInstalled">
      <arg direction="out" type="s" name="packages"/>
    </method>
    <method name="ListAllUpdates">
      <arg direction="out" type="s" name="updates"/>
    </method>
  </interface>
</node>`;

/** TypeScript view of the Manager D-Bus interface. */
export interface ManagerIface {
  ListInstalled(backend: string): string;
  ListUpdates(backend: string): string;
  ListAllInstalled(): string;
  ListAllUpdates(): string;
}
