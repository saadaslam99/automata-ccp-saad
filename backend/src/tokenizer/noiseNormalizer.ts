import rules from '../../data/rules.json';

export function normalizeNoise(tokens: string[]): { normalizedTokens: string[], noiseDetected: string[] } {
  const noiseMap: Record<string, string> = rules.noiseNormalization;
  const noiseDetected: string[] = [];
  const normalizedTokens = tokens.map(token => {
    const lower = token.toLowerCase();
    if (noiseMap[lower]) {
      noiseDetected.push(`Repeated letters fixed: ${token} -> ${noiseMap[lower]}`);
      return noiseMap[lower];
    }
    return token;
  });
  
  return { normalizedTokens, noiseDetected };
}
