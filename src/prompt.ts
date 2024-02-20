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
