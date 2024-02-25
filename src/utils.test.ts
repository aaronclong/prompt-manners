import test from "ava";

import { isNullish } from "./utils.js";

test("isNullish", (t) => {
  t.true(isNullish(null));
});
