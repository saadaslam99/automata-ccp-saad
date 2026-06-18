import React from 'react';

export default function Header() {
  return (
    <div className="flex flex-col gap-3 pb-6 border-b border-panel-border mb-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#c026d3] via-[#8b5cf6] to-[#4f46e5] shadow-lg shadow-[#8b5cf6]/20 shrink-0 select-none">
          <span className="text-white text-3xl pt-1 pr-1" style={{ fontFamily: "'Great Vibes', cursive", lineHeight: 1 }}>
            VT
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">VarToken Studio</h1>
      </div>
      <p className="text-muted text-sm leading-relaxed max-w-lg">
        Manual automata-based tokenizer for noisy, code-mixed, and language-variant text.
      </p>
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold bg-panel border border-panel-border text-accent rounded">DFA Engine</span>
        <span className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold bg-panel border border-panel-border text-accent rounded">Turing Tape</span>
        <span className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold bg-panel border border-panel-border text-accent rounded">Roman Urdu Normalization</span>
        <span className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold bg-panel border border-panel-border text-muted rounded">LLM Meaning Layer</span>
      </div>
    </div>
  );
}
