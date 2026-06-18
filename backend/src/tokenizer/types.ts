export type SymbolType =
  | 'Uppercase English Letter'
  | 'Lowercase English Letter'
  | 'Digit'
  | 'Space'
  | 'Hashtag'
  | 'Mention'
  | 'Punctuation'
  | 'Unknown';

export interface TokenizationStep {
  step: number;
  currentState: string;
  readSymbol: string;
  symbolType: SymbolType;
  ruleApplied: string;
  writeSymbol: string;
  move: 'L' | 'R' | 'S';
  nextState: string;
  explanation: string;
}

export interface FinalOutput {
  rawInput: string;
  languageType: string;
  detectedNoise: string[];
  cleanTokens: string[];
  detectedKeywords: string[];
  automataDecision: string;
  finalStatus: string;
  llmContextualMeaning?: string;
  trace: TokenizationStep[];
}
