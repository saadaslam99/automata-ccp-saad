import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

export default function InputConsole({ defaultText, onRun, onReset }) {
  const [text, setText] = useState(defaultText);

  return (
    <div className="bg-panel border border-panel-border rounded-lg p-5 flex flex-col gap-4 shadow-lg mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Raw Input Console</h2>
      </div>
      
      <textarea 
        className="w-full bg-background border border-panel-border rounded p-3 text-gray-200 font-mono text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none resize-none h-24"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex gap-3">
        <button 
          onClick={() => onRun(text)}
          className="flex-1 bg-accent text-background font-semibold py-2 rounded flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors shadow-[0_0_10px_rgba(56,189,248,0.15)] text-sm"
        >
          <Play fill="currentColor" className="w-4 h-4" /> Run Automata Tokenization
        </button>
        <button 
          onClick={() => { setText(defaultText); onReset(); }}
          className="px-4 py-2 bg-background border border-panel-border text-muted hover:text-white rounded flex items-center justify-center transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
