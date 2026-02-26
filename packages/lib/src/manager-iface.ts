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
    <method name="Search">
      <arg direction="in"  type="s" name="backend"/>
      <arg direction="in"  type="s" name="query"/>
      <arg direction="out" type="s" name="packages"/>
    </method>
    <method name="SearchAll">
      <arg direction="in"  type="s" name="query"/>
      <arg direction="out" type="s" name="packages"/>
    </method>
    <method name="GetPackage">
      <arg direction="in"  type="s" name="backend"/>
      <arg direction="in"  type="s" name="id"/>
      <arg direction="out" type="s" name="package"/>
    </method>
    <method name="ListAvailable">
      <arg direction="in"  type="s" name="backend"/>
      <arg direction="out" type="s" name="packages"/>
    </method>
    <method name="ListAllAvailable">
      <arg direction="out" type="s" name="packages"/>
    </method>
    <method name="ListByCategory">
      <arg direction="in"  type="s" name="backend"/>
      <arg direction="in"  type="s" name="category"/>
      <arg direction="out" type="s" name="packages"/>
    </method>
    <method name="ListAllByCategory">
      <arg direction="in"  type="s" name="category"/>
      <arg direction="out" type="s" name="packages"/>
    </method>
    <method name="RefreshMetadata">
      <arg direction="in"  type="s" name="backend"/>
    </method>
    <method name="RefreshAllMetadata">
    </method>
  </interface>
</node>`;

/** TypeScript view of the Manager D-Bus interface. */
export interface ManagerIface {
  ListInstalled(backend: string): string;
  ListUpdates(backend: string): string;
  ListAllInstalled(): string;
  ListAllUpdates(): string;
  Search(backend: string, query: string): string;
  SearchAll(query: string): string;
  GetPackage(backend: string, id: string): string;
  ListAvailable(backend: string): string;
  ListAllAvailable(): string;
  ListByCategory(backend: string, category: string): string;
  ListAllByCategory(category: string): string;
  RefreshMetadata(backend: string): void;
  RefreshAllMetadata(): void;
}
