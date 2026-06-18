import { SymbolType } from './types';

export function classifyCharacter(char: string): SymbolType {
  if (/[A-Z]/.test(char)) return 'Uppercase English Letter';
  if (/[a-z]/.test(char)) return 'Lowercase English Letter';
  if (/[0-9]/.test(char)) return 'Digit';
  if (/\s/.test(char)) return 'Space';
  if (char === '#') return 'Hashtag';
  if (char === '@') return 'Mention';
  if (/[.,!?;:]/.test(char)) return 'Punctuation';
  return 'Unknown';
}
