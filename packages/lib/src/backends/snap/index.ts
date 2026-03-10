import type { IPackageBackend } from "../backend.ts";
import type { AnyPackage } from "../../types.ts";

export class SnapBackend implements IPackageBackend {
  listAvailable(): AnyPackage[] {
    throw new Error("SnapBackend.listAvailable: not implemented");
  }
}
