import type { H3 } from "h3";
import { createClient, createConfig } from "@huab/sdk/client";
import { HuabSdk } from "@huab/sdk";

const BASE_URL = "http://local.huab";

function resolveRequestUrl(input: RequestInfo | URL): URL {
  if (input instanceof URL) return input;
  if (typeof input === "string") return new URL(input, BASE_URL);
  return new URL(input.url, BASE_URL);
}

export function createCustomFetch(app: H3): typeof fetch {
  const customFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    let request: Request;

    if (input instanceof Request) {
      request = init ? new Request(input, init) : input;
    } else {
      const url = resolveRequestUrl(input);
      request = new Request(url.toString(), init);
    }

    return app.request(request);
  };

  return customFetch as typeof fetch;
}

export function createInProcessSdkClient(app: H3) {
  const client = createClient(
    createConfig({
      baseUrl: BASE_URL,
      fetch: createCustomFetch(app),
    }),
  );
  return new HuabSdk({ client });
}
