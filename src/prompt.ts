import { Optional } from "./lib-core.js";
import { isFalsy } from "./utils.js";

export const PromptSymbol = Symbol.for("prompt-tag");

// TODO: Terms to flush out
// data prompt
// instruction prompt

type PromptTypes = "instruction" | "data";

export interface Prompt {
  [PromptSymbol]: PromptTypes;
}

export interface DataPrompt extends Prompt {
  data: string;
  format: (input: string) => string;
  [PromptSymbol]: "data";
}

export function dataPrompt(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _literals: TemplateStringsArray,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ..._args: unknown[]
): DataPrompt {
  return {
    data: "", // TODO: handle hard coded inputs for the data prompt
    format: (input) => input,
    [PromptSymbol]: "data",
  };
}

export interface InstructionPrompt extends Prompt {
  instruction: string;
  [PromptSymbol]: "instruction";
}

export function instructionPrompt(
  literals: TemplateStringsArray,
  ...args: unknown[]
): InstructionPrompt {
  const rawPrompt = literals
    .map((literal, idx) => {
      let result = literal;
      if (idx < args.length) {
        result += args[idx] as string;
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

export interface PromptCompiler {
  renderPrompt: (input?: string) => Optional<string>;
}

export function promptCompiler(
  _literals: TemplateStringsArray,
  ...args: unknown[]
) {
  // The question is how do zip them
  // Since this could start as an arg and continue?
  // for this tag the args might be more important
  // This ordering might not matter because we are just using this to compile all the prompts to one
  const prompts = new Map<PromptTypes, Prompt>();

  for (const arg of args) {
    if (Object.hasOwn(arg as object, PromptSymbol)) {
      prompts.set((arg as object)[PromptSymbol], arg as Prompt);
    }
  }

  /**
   * This will always render in this order
   * 1. instruction prompt
   * 2. data prompt
   */
  const renderPrompt = (input?: string): Optional<string> => {
    if (!prompts.has("instruction")) {
      return Optional.empty();
    }

    let result = "";
    const instruction = prompts.get("instruction") as InstructionPrompt;
    result += instruction.instruction;

    if (!isFalsy(input) && prompts.has("data")) {
      result += "\n\n";
      const data = prompts.get("data") as DataPrompt;
      result += data.format(input as unknown as string);
    }

    return Optional.of(result);
  };

  return {
    renderPrompt,
  };
}
