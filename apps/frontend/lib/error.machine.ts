import { createMachine, createSchema } from "xstate";

export const errorMachine = createMachine(
  {
    schema: {
      actions: createSchema<{ type: "RESET" }>(),
      context: createSchema(),
      events: createSchema<{ type: "CONFIRM" } | { type: "RESET" }>(),
    },
    id: "error",
    initial: "error",
    states: {
      error: {
        on: {
          RESET: { target: "needsConfirmation" },
        },
      },
      needsConfirmation: {
        on: {
          CONFIRM: { actions: "reset" },
        },
      },
    },
  },
  {
    actions: {
      reset: () => {
        localStorage.clear();
        location.reload();
      },
    },
  },
);
