function prompt(literals: TemplateStringsArray, ...keys: unknown[]) {
  console.log(literals, keys);

  const rawPrompt = literals.flatMap((literal, idx) => {
    const result = [literal];
    if (idx < keys.length) {
      result.push(keys[idx] as string);
    }
  });
  return {
    rawPrompt,
  };
}
