import test from "ava";

import { prompt, instructionPrompt, PromptSymbol } from "./prompt.js";

test("prompt, happy path", (t) => {
  const { rawPrompt } = prompt`foo`;
  t.is(rawPrompt, "foo");
});

test.skip("prompt, parse slot correctly", (t) => {
  const { rawPrompt } = prompt`
  Answer the following question:<slot>
  Slot: Find the answer to life, the universe, and everything.
`;
  t.is(rawPrompt, "foo");
});

test("instructionPrompt, parse slot correctly", (t) => {
  const instruction = instructionPrompt`
   Give a recommendation based on the user's request
  `;
  t.not(instruction, null);
  t.is(instruction[PromptSymbol], "instruction");
  t.is(
    instruction.instruction,
    "Give a recommendation based on the user's request"
  );
});
