import test from "ava";

import { prompt } from "./prompt.js";

const fn = () => "foo";

test("prompt, happy path", (t) => {
  const { rawPrompt } = prompt`foo`;
  t.is(rawPrompt, "foo");
});
