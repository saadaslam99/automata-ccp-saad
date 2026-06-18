export function processHashtags(tokens: string[]): { normalizedTokens: string[], noiseDetected: string[] } {
  const noiseDetected: string[] = [];
  const normalizedTokens: string[] = [];
  
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === '#') {
       if (i + 1 < tokens.length) {
         const hashtagWord = tokens[i+1];
         noiseDetected.push(`Hashtag compound word split: #${hashtagWord}`);
         const parts = hashtagWord.split(/(?=[A-Z])|(?<=[a-zA-Z])(?=[0-9])/).filter(Boolean);
         normalizedTokens.push(...parts);
         i++;
       }
    } else if (tokens[i].startsWith('#') && tokens[i].length > 1) {
        const hashtagWord = tokens[i].slice(1);
        noiseDetected.push(`Hashtag compound word split: ${tokens[i]}`);
        const parts = hashtagWord.split(/(?=[A-Z])|(?<=[a-zA-Z])(?=[0-9])/).filter(Boolean);
        normalizedTokens.push(...parts);
    } else {
      normalizedTokens.push(tokens[i]);
    }
  }
  
  return { normalizedTokens, noiseDetected };
}
