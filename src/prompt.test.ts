import test from "ava";

import { prompt, instructionPrompt, PromptSymbol } from "./prompt.js";

test("prompt, happy path", (t) => {
  const { renderPrompt } = prompt`foo`;
  const p = renderPrompt();
  t.falsy(p.value);
  t.false(p.isPresent);
});

test("prompt, parse slot correctly", (t) => {
  const { renderPrompt } = prompt`
  ${instructionPrompt`Answer the following question`}:<slot>
  Slot: Find the answer to life, the universe, and everything.
`;
  t.is(renderPrompt().value, "Answer the following question");
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
