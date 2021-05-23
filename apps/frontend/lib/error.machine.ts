import { createMachine } from "@xstate/compiled";

type Context = {};
type Event = { type: "ERROR" } | { type: "CONFIRM" } | { type: "RESET" };

export const errorMachine = createMachine<Context, Event, "error">({
  id: "error",
  initial: "running",
  states: {
    running: {
      on: {
        ERROR: { target: "error" },
      },
    },
    error: {
      on: {
        RESET: { target: "needsConfirmation" },
      },
    },
    needsConfirmation: {
      on: {
        CONFIRM: { target: "running" },
      },
    },
  },
});
