export const PromptSymbol = Symbol.for("prompt-tag");

// TODO: Terms to flush out
// data prompt
// instruction prompt

export function instructionPrompt(
  literals: TemplateStringsArray,
  ...keys: unknown[]
) {
  const rawPrompt = literals
    .map((literal, idx) => {
      let result = literal;
      if (idx < keys.length) {
        result += keys[idx] as string;
      }

      return result;
    })
    .join("")
    .trim();

  return {
    instruction: rawPrompt,
    [PromptSymbol]: "instruction",
  };
}

export function prompt(literals: TemplateStringsArray, ...keys: unknown[]) {
  const rawPrompt = literals
    .map((literal, idx) => {
      let result = literal;
      if (idx < keys.length) {
        result += keys[idx] as string;
      }

      return result;
    })
    .join("");

  return {
    rawPrompt,
  };
}
