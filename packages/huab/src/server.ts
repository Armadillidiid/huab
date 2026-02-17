import { H3 } from "h3";

export const server = new H3().get("/", (event) => {
  return "Hello, Huab!";
});
