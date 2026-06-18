import { FinalOutput } from './types';
import { runStateMachine } from './stateMachine';
import { normalizeNoise } from './noiseNormalizer';
import { normalizeRomanUrdu } from './romanUrduNormalizer';
import { processHashtags } from './hashtagProcessor';
import { matchKeywords } from './keywordMatcher';

export function buildTokenizationOutput(input: string): FinalOutput {
  const { tape, trace, rawTokens } = runStateMachine(input);
  const allNoise: string[] = [];
  
  const { normalizedTokens: step2Tokens, noiseDetected: step2Noise } = processHashtags(rawTokens);
  allNoise.push(...step2Noise);
  
  const { normalizedTokens: step3Tokens, noiseDetected: step3Noise } = normalizeNoise(step2Tokens);
  allNoise.push(...step3Noise);
  
  const { normalizedTokens: finalTokens, noiseDetected: step4Noise } = normalizeRomanUrdu(step3Tokens);
  allNoise.push(...step4Noise);
  
  const detectedKeywords = matchKeywords(finalTokens);
  
  return {
    rawInput: input,
    languageType: "Roman Urdu + English Code-Mixed Text",
    detectedNoise: allNoise.length > 0 ? allNoise : ["None"],
    cleanTokens: finalTokens,
    detectedKeywords,
    automataDecision: "qaccept",
    finalStatus: "Successfully tokenized and normalized",
    trace
  };
}
