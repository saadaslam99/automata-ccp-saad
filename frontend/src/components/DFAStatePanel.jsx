import React from 'react';
import { Network } from 'lucide-react';

export default function DFAStatePanel({ transitions }) {
  if (!transitions || transitions.length === 0) return null;
  const lastTransition = transitions[transitions.length - 1];

  const states = [
    { id: 'q0', label: 'Start' },
    { id: 'q1', label: 'Classification' },
    { id: 'q2', label: 'English/Roman Word' },
    { id: 'q3', label: 'Urdu Word' },
    { id: 'q4', label: 'Number' },
    { id: 'q5', label: 'Space/Boundary' },
    { id: 'q6', label: 'Punctuation' },
    { id: 'q9', label: 'Hashtag' },
    { id: 'q10', label: 'Mention' },
    { id: 'q11', label: 'Normalization' },
    { id: 'qaccept', label: 'Accepted' },
    { id: 'qreject', label: 'Reject' },
  ];

  return (
    <div className="bg-panel border border-panel-border rounded-lg p-5 mb-6 flex gap-6">
      <div className="w-1/3 border-r border-panel-border pr-4">
        <div className="flex items-center gap-2 mb-4">
          <Network className="w-4 h-4 text-muted" />
          <h2 className="text-xs font-semibold text-muted uppercase tracking-wider">State Machine</h2>
        </div>
        <div className="flex flex-col gap-1 overflow-y-auto max-h-64 custom-scrollbar pr-2">
          {states.map(state => {
            const isActive = lastTransition.nextState === state.id || (lastTransition.nextState.includes('q') && state.id === 'q2'); // simplistic mapping for visual
            return (
              <div key={state.id} className={`px-2 py-1.5 text-xs font-mono rounded flex justify-between items-center ${isActive ? 'bg-accent/20 text-accent border border-accent/30' : 'text-muted hover:bg-background'}`}>
                <span>{state.id}</span>
                <span className={`text-[10px] ${isActive ? 'text-accent' : 'text-gray-500'}`}>{state.label}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-2/3 flex flex-col justify-center">
        <h3 className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-4">Current Transition</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background rounded p-3 border border-panel-border">
            <span className="block text-[10px] text-muted mb-1 uppercase">Read Symbol</span>
            <span className="font-mono text-sm text-white">{lastTransition.readSymbol === ' ' ? '␣' : lastTransition.readSymbol}</span>
          </div>
          <div className="bg-background rounded p-3 border border-panel-border">
            <span className="block text-[10px] text-muted mb-1 uppercase">Action</span>
            <span className="font-mono text-xs text-warning">{lastTransition.action}</span>
          </div>
          <div className="bg-background rounded p-3 border border-panel-border col-span-2">
            <span className="block text-[10px] text-muted mb-1 uppercase">State Transition</span>
            <div className="flex items-center gap-3 font-mono text-sm">
              <span className="text-gray-400">{lastTransition.fromState}</span>
              <span className="text-accent">→</span>
              <span className="text-accent font-bold">{lastTransition.nextState}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
