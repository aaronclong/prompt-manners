export interface ITokenizer {
  encode(sentence: string): Promise<IEncoding>;
}

export interface IEncoding {
  getTokens(): string[];
}

export async function loadDefaultTokenizer(): Promise<ITokenizer> {
  try {
    const { Tokenizer, BPE } = await import("tokenizers");
    return new Tokenizer(BPE.init({}, [], { unkToken: "[UNK]" }));
  } catch (e) {
    console.warn('Failed to load "tokenizers, check the install', e);
    // This is a workaround until the library get fixed
    return {
      encode: () => {
        throw e;
      },
    };
  }
}
