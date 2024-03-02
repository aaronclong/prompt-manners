import {
  loadDefaultTokenizer,
  ITokenizer,
} from "./defense-strategies/index.js";
import { PromptCompiler } from "./prompt.js";
import { isFalsy } from "./utils.js";

export interface PromptEngineConfig {
  modelName: string;
  retokenize?: ITokenizer | boolean;
  maxInputLength?: number;
}

export class PromptEngine {
  constructor(
    private readonly promptCompiler: PromptCompiler,
    private readonly config: PromptEngineConfig,
    // Future thoughts, should this be mutable
    private tokenizer?: ITokenizer
  ) {}

  buildPrompt = async (input: string) => {
    const fmtInput = (await this.runTokenization(input)) ?? input;
    // todo implement BPE-dropout
    return this.promptCompiler.renderPrompt(fmtInput);
  };

  private runTokenization = async (input: string) => {
    const encoding = await this.tokenizer?.encode(input);
    return encoding?.getTokens()?.join(" ");
  };

  public static async create(
    promptCompiler: PromptCompiler,
    config: PromptEngineConfig
  ): Promise<PromptEngine> {
    const tokenizer = await PromptEngine.setupTokenizer(config);
    return new PromptEngine(promptCompiler, config, tokenizer);
  }

  private static async setupTokenizer(
    config: PromptEngineConfig
  ): Promise<ITokenizer | undefined> {
    if (isFalsy(config.retokenize)) {
      return;
    }

    if (typeof config.retokenize === "boolean" && config.retokenize) {
      return await loadDefaultTokenizer();
    }

    return config.retokenize as ITokenizer;
  }
}
