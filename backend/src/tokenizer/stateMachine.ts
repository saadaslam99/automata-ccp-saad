import { classifyCharacter } from './characterClassifier';
import { TapeMachine } from './tapeMachine';
import { TokenizationStep } from './types';

export function runStateMachine(input: string): { tape: string[], trace: TokenizationStep[], rawTokens: string[] } {
  const machine = new TapeMachine(input);
  const trace: TokenizationStep[] = [];
  let currentState = 'q1'; // initial char classification
  let stepCount = 0;
  
  let previousType = 'Unknown';
  const rawTokens: string[] = [];
  let currentToken = '';

  while (!machine.isEnd()) {
    stepCount++;
    const char = machine.read();
    if (char === 'B') break;

    const charType = classifyCharacter(char);
    let ruleApplied = '';
    let nextState = '';
    let writeSymbol = char;
    let pushToken = false;
    
    if (charType === 'Uppercase English Letter' && previousType === 'Lowercase English Letter') {
      ruleApplied = 'Uppercase after lowercase means missing space boundary';
      nextState = 'q8';
      pushToken = true;
      machine.write('|');
      writeSymbol = '|';
    } else if (charType === 'Digit' && (previousType === 'Lowercase English Letter' || previousType === 'Uppercase English Letter')) {
      ruleApplied = 'Letter followed by Digit -> Number Boundary';
      nextState = 'q4';
      pushToken = true;
      machine.write('|');
      writeSymbol = '|';
    } else if (charType === 'Space') {
      ruleApplied = 'Space -> Token Boundary';
      nextState = 'q5';
      pushToken = true;
    } else if (charType === 'Punctuation') {
      ruleApplied = 'Punctuation -> Boundary';
      nextState = 'q6';
      pushToken = true;
    } else if (charType === 'Hashtag') {
      ruleApplied = 'Hashtag -> Processing start';
      nextState = 'q9';
      pushToken = true;
    } else if (charType === 'Mention') {
      ruleApplied = 'Mention -> Processing start';
      nextState = 'q10';
      pushToken = true;
    } else {
      ruleApplied = 'Continue scanning word';
      nextState = 'q2';
    }

    if (pushToken && currentToken.length > 0) {
      rawTokens.push(currentToken);
      currentToken = '';
    }

    if (charType !== 'Space' && char !== 'B') {
      currentToken += char;
    }

    trace.push({
      step: stepCount,
      currentState,
      readSymbol: char,
      symbolType: charType,
      ruleApplied,
      writeSymbol,
      move: 'R',
      nextState,
      explanation: `The machine transitioned from ${currentState} to ${nextState} reading ${char}.`
    });

    currentState = nextState;
    previousType = charType;
    machine.moveRight();
  }

  if (currentToken.length > 0) {
    rawTokens.push(currentToken);
  }

  return { tape: machine.getTape(), trace, rawTokens };
}
