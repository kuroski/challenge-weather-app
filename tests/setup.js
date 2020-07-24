import "@testing-library/jest-dom";
import { makeServer } from "@/server";

// eslint-disable-next-line no-undef
beforeEach(() => {
  global.server = makeServer();
});

// eslint-disable-next-line no-undef
afterEach(() => {
  global?.server?.shutdown();
});
