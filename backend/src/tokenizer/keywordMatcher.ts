import rules from '../../data/rules.json';

export function matchKeywords(tokens: string[]): string[] {
  const keywordList: string[] = rules.keywords;
  const detectedKeywords: string[] = [];
  const text = tokens.join(' ').toLowerCase();
  
  keywordList.forEach(kw => {
    if (text.includes(kw.toLowerCase())) {
      detectedKeywords.push(kw);
    }
  });
  
  return detectedKeywords;
}
