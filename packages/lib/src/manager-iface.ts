import { IFACE_NAME } from './constants.js';

export const MANAGER_IFACE_XML = `
<node>
  <interface name="${IFACE_NAME}">
    <method name="ListInstalled">
      <arg direction="out" type="s" name="packages"/>
    </method>
    <method name="ListUpdates">
      <arg direction="out" type="s" name="updates"/>
    </method>
  </interface>
</node>`;

/** TypeScript view of the Manager D-Bus interface. */
export interface ManagerIface {
  ListInstalled(): string;
  ListUpdates(): string;
}
