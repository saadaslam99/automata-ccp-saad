import React from 'react';
import Mermaid from '../components/Mermaid';

export default function AutomataModel() {
  const automataDiagram = `
stateDiagram-v2
    direction LR

    state "q0 (start)" as q0
    state "q1 (classify)" as q1
    state "q2 (Eng/Roman Urdu word)" as q2
    state "q3 (Urdu word)" as q3
    state "q4 (number)" as q4
    state "q5 (boundary)" as q5
    state "q6 (process hashtag)" as q6
    state "q7 (normalize repetition)" as q7
    state "q8 (split joined word)" as q8
    state "q10 (process mention)" as q10
    state "q11 (normalize variant)" as q11
    state "q12 (keyword match)" as q12
    state "q13 (build output)" as q13
    state "qaccept (accept)" as qaccept
    state "qreview (review)" as qreview
    state "qreject (reject)" as qreject

    [*] --> q0 : start
    q0 --> q1 : any/any,R
    
    q1 --> q2 : Eng/Eng,R
    q1 --> q3 : Urdu/Urdu,R
    q1 --> q4 : digit/digit,R
    q1 --> q5 : space/|,R
    q1 --> q6 : #/H,R
    q1 --> q10 : @/M,R
    
    q2 --> q2 : lower/lower,R
    q2 --> q7 : repeat/X,R
    q2 --> q8 : Upper/|,R
    q2 --> q11 : space/|,R
    
    q3 --> q11 : space/|,R
    
    q4 --> q11 : letter/|,R
    q4 --> q11 : space/|,R
    
    q5 --> q11 : letter/letter,R
    q5 --> q11 : Urdu/Urdu,R
    q5 --> q11 : digit/digit,R
    q5 --> q11 : #/H,R
    q5 --> q11 : @/M,R
    
    q6 --> q11 : letter/letter,R
    
    q10 --> q10 : id/id,R
    q10 --> q11 : space/|,R
    
    q7 --> q11 : new/new,R
    
    q8 --> q11 : digit/digit,R
    q8 --> q11 : Upper/|,R
    
    q11 --> q12 : variant/norm,R
    q11 --> q12 : other/other,R
    
    q12 --> q13 : keyword/keyword,R
    q12 --> q13 : no match/no match,R
    
    q13 --> qaccept : done/done,S
    
    q1 --> qreview : unsupported,S
    q1 --> qreject : invalid,S
    q13 --> qreject : invalid,S
    q13 --> qreview : no match,S
  `;

  return (
    <div className="max-w-[1200px] mx-auto p-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-white mb-6">Automata Model Specification</h1>
      <div className="bg-panel border border-panel-border rounded-lg p-8 mb-6 shadow-lg shadow-accent/5">
        <h2 className="text-lg font-semibold text-accent mb-4">Formal Definition</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          The VarToken tokenizer is formally defined as a Deterministic Finite Automaton (DFA) modified with a tape, acting as a read/write Turing Machine. It is represented by the tuple <span className="font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">M = (Q, Σ, Γ, δ, q0, B, F)</span>:
        </p>
        <ul className="list-disc pl-5 text-gray-400 space-y-4 mb-6 font-mono text-sm">
          <li><strong className="text-white">Q (States)</strong>: Set of finite states {'{q0, q1, ..., q13, qaccept, qreject}'}. Each state corresponds to a specific token scanning phase (e.g., scanning English word, scanning Urdu word, scanning Hashtag).</li>
          <li><strong className="text-white">Σ (Input Alphabet)</strong>: The alphabet containing ASCII characters (Uppercase, Lowercase, Digits, Spaces, Symbols).</li>
          <li><strong className="text-white">Γ (Tape Alphabet)</strong>: Σ ∪ {'{|, X, B}'} where | is the boundary marker and X is a noise marker.</li>
          <li><strong className="text-white">δ (Transition Function)</strong>: The core logic mapping Q × Γ → Q × Γ × {'{L, R}'}.</li>
          <li><strong className="text-white">q0 (Start State)</strong>: The initial scanning state.</li>
          <li><strong className="text-white">B (Blank Symbol)</strong>: The empty tape symbol indicating EOF.</li>
          <li><strong className="text-white">F (Accept States)</strong>: {'{qaccept}'}.</li>
        </ul>
      </div>
      
      <div className="bg-panel border border-panel-border rounded-lg p-8 shadow-lg shadow-accent/5">
        <h2 className="text-lg font-semibold text-accent mb-6">Architecture Diagram</h2>
        <div className="w-full overflow-hidden bg-background/50 rounded-lg border border-panel-border p-4">
          <Mermaid chart={automataDiagram} />
        </div>
      </div>
    </div>
  );
}
