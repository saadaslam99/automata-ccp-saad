import rules from '../../data/rules.json';

export function normalizeRomanUrdu(tokens: string[]): { normalizedTokens: string[], noiseDetected: string[] } {
  const urduMap: Record<string, string> = rules.romanUrduMapping;
  const noiseDetected: string[] = [];
  const normalizedTokens: string[] = [];
  
  tokens.forEach(token => {
    const lower = token.toLowerCase();
    if (urduMap[lower]) {
      noiseDetected.push(`Roman Urdu short form fixed: ${token} -> ${urduMap[lower]}`);
      const expanded = urduMap[lower].split(' ');
      normalizedTokens.push(...expanded);
    } else {
      normalizedTokens.push(token);
    }
  });

  return { normalizedTokens, noiseDetected };
}
