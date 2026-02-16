import { NodeContext, NodeRuntime, NodeTerminal } from "@effect/platform-node";
import { Cause, Effect, Exit, Layer } from "effect";
import { CliService } from "./cli.ts";

const layers = Layer.mergeAll(
  NodeContext.layer,
  NodeTerminal.layer,
  CliService.Default,
);

Effect.gen(function* () {
  const cli = yield* CliService;
  yield* cli.run(process.argv);
}).pipe(
  Effect.provide(layers),
  NodeRuntime.runMain({
    teardown: (exit) => {
      // Force exit: copy-paste library spawns child processes (pbcopy/xclip/clip),
      // which keeps Node's event loop alive even after the command completes successfully
      const code =
        Exit.isFailure(exit) && !Cause.isInterruptedOnly(exit.cause) ? 1 : 0;
      process.exit(code);
    },
  }),
);
