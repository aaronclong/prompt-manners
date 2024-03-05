import {
  loadDefaultTokenizer,
  ITokenizer,
} from "./defense-strategies/index.js";
import { Optional } from "./lib-core.js";
import { PromptCompiler } from "./prompt.js";
import { isFalsy } from "./utils.js";

export interface PromptEngineConfig {
  modelName: string;
  retokenize?: ITokenizer | boolean;
  maxInputLength?: number;
}

export type PromptStep = "paraphrase" | "ready";

export interface IPrompt {
  getSteps(): PromptStep[];
  addResult(step: PromptStep, value: string);
  render(): Promise<Optional<string>>;
}

type PromptStepStatus = "incomplete" | "complete";

export class Prompt implements IPrompt {
  private stepStates: Map<
    PromptStep,
    { status: PromptStepStatus; value: string }
  >;
  constructor(
    private readonly dataInput: string,
    private readonly steps: PromptStep[],
    private readonly promptCompiler: PromptCompiler,
    private readonly tokenizer?: ITokenizer
  ) {
    this.stepStates = new Map(
      steps.map((step) => [step, { status: "incomplete", value: "" }])
    );
  }

  getSteps = (): PromptStep[] => {
    return [...this.steps];
  };

  addResult = (step: PromptStep, value: string) => {
    this.stepStates.set(step, { status: "complete", value });
  };

  render = async (): Promise<Optional<string>> => {
    const paraphrase = this.paraphrasePrompt();

    const data = paraphrase.isPresent
      ? (paraphrase.value as string)
      : this.dataInput;

    const fmtInput = (await this.runTokenization(data)) ?? data;
    return this.promptCompiler.renderPrompt(fmtInput);
  };

  private runTokenization = async (input: string) => {
    const encoding = await this.tokenizer?.encode(input);
    return encoding?.getTokens()?.join(" ");
  };

  private paraphrasePrompt = (): Optional<string> => {
    // this.input;
    // return this.promptCompiler.renderPrompt(fmtInput);
    const paraphrase = this.stepStates.has("paraphrase")
      ? this.stepStates.get("paraphrase")
      : undefined;

    if (paraphrase && paraphrase?.status !== "complete") {
      return this.promptCompiler.preProcessData(this.dataInput);
    }

    if (paraphrase && paraphrase?.status === "complete") {
      return Optional.of(paraphrase.value);
    }
    return Optional.empty();
  };
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
