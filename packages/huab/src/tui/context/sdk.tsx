import { createInProcessSdkClient } from "../../api/sdk-client.ts";
import { server } from "../../server.ts";
import { createSimpleContext } from "./helper.tsx";
import { subscribeEvent, emitEvent } from "../../events/event-bus.ts";

const sdkContext = createSimpleContext({
  name: "SDK",
  init: () => {
    const client = createInProcessSdkClient(server);
    return {
      get client() {
        return client;
      },
      event: { subscribeEvent, emitEvent },
    };
  },
});

export const SDKProvider = sdkContext.provider;
export function useSDK() {
  return sdkContext.use();
}
