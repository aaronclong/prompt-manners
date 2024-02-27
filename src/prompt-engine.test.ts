import test from "ava";

import { PromptEngine } from "./prompt-engine.js";

import { promptCompiler, instructionPrompt, dataPrompt } from "./prompt.js";

test.skip("retokenize, happy path", async (t) => {
  const dPrompt =
    "Tell me the genre of this band, it's back story, and what are their current projects";
  const compiler = promptCompiler`${instructionPrompt`Food band`}${dataPrompt``}`;

  const engine = new PromptEngine(compiler, {
    modelName: "gpt2",
    retokenize: true,
  });
  const prompt = await engine.buildPrompt(dPrompt);
  t.falsy(prompt.value);
  t.false(prompt.isPresent);
});
