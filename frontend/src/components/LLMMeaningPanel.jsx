import React from 'react';
import { Sparkles } from 'lucide-react';

export default function LLMMeaningPanel({ meaning, isLoading }) {
  if (!meaning && !isLoading) return null;

  return (
    <div className="bg-[#0B1426] border border-accent/20 rounded-lg p-6 relative overflow-hidden mb-6">
      <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-accent" />
        <h2 className="text-sm font-semibold text-white tracking-wide">Contextual Meaning After Tokenization</h2>
      </div>
      
      <div className="bg-warning/10 border border-warning/20 rounded p-3 mb-4">
        <p className="text-xs text-warning leading-relaxed">
          <strong>Important Note:</strong> The LLM does not perform tokenization. It only explains the meaning after automata-based tokenization is complete.
        </p>
      </div>

      <div className="bg-background/80 border border-panel-border rounded p-4 min-h-[100px] flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs text-muted font-mono uppercase tracking-widest">Querying Model...</span>
          </div>
        ) : (
          <p className="text-sm text-gray-200 leading-loose whitespace-pre-wrap w-full">
            {meaning}
          </p>
        )}
      </div>
    </div>
  );
}
