import test from "ava";

import {
  promptCompiler,
  instructionPrompt,
  PromptSymbol,
  dataPrompt,
} from "./prompt.js";

test("prompt, happy path", (t) => {
  const { renderPrompt } = promptCompiler`foo`;
  const p = renderPrompt();
  t.falsy(p.value);
  t.false(p.isPresent);
});

test("prompt, parse slot correctly", (t) => {
  const { renderPrompt } = promptCompiler`
  ${instructionPrompt`Answer the following question`}:<slot>
  Slot: Find the answer to life, the universe, and everything.
`;
  t.is(renderPrompt().value, "Answer the following question");
});

test("prompt, run data prompt", (t) => {
  const { renderPrompt } = promptCompiler`
  ${instructionPrompt`Answer the following question:`}
  ${dataPrompt``}
`;

  const dPrompt = "Find the answer to life, the universe, and everything";
  const p = renderPrompt(dPrompt);

  const expected = `Answer the following question:\n\n${dPrompt}`;
  t.true(p.isPresent);
  t.is(p.value, expected);
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
