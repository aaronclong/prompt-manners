import { Tokenizer, BPE } from "tokenizers";
import { PromptCompiler } from "./prompt.js";
import { isFalsy } from "./utils.js";

// import { BPE } from "tokenizers/bindings/models";

export interface PromptEngineConfig {
  modelName: string;
  retokenize?: Tokenizer | boolean;
  maxInputLength?: number;
}

export class PromptEngine {
  private tokenizer?: Tokenizer;
  // Future thoughts, maybe this should be mutable
  constructor(
    private readonly promptCompiler: PromptCompiler,
    private readonly config: PromptEngineConfig
  ) {
    this.tokenizer = PromptEngine.setupTokenizer(this.config);
  }

  buildPrompt = async (input: string) => {
    const fmtInput = (await this.runTokenization(input)) ?? input;
    // todo implement BPE-dropout
    return this.promptCompiler.renderPrompt(fmtInput);
  };

  private runTokenization = async (input: string) => {
    const encoding = await this.tokenizer?.encode(input);
    return encoding?.getTokens()?.join(" ");
  };

  private static setupTokenizer(
    config: PromptEngineConfig
  ): Tokenizer | undefined {
    if (isFalsy(config.retokenize)) {
      return;
    }

    if (config.retokenize instanceof Tokenizer) {
      return config.retokenize;
    }

    throw new Error("Tokenizer not yet implemented");

    // return new Tokenizer(config.modelName);
    // https://huggingface.co/docs/tokenizers/en/quicktour#training-the-tokenizer
    // https://github.com/huggingface/tokenizers/issues/1403
    return new Tokenizer(BPE.init({}, [], { unkToken: "[UNK]" }));
  }
}
