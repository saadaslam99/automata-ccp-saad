import React from 'react';

export default function TransitionTable() {
  const transitions = [
    { state: 'q0', input: 'Upper', next: 'q1', action: 'Scan Word' },
    { state: 'q0', input: 'Lower', next: 'q1', action: 'Scan Word' },
    { state: 'q1', input: 'Lower', next: 'q1', action: 'Continue' },
    { state: 'q1', input: 'Upper', next: 'q8', action: 'Detect Missing Space' },
    { state: 'q0', input: '#', next: 'q9', action: 'Hashtag Process' },
    { state: 'q9', input: 'Upper', next: 'q9', action: 'Split Compound' },
    { state: 'q0', input: 'Space', next: 'q5', action: 'Insert Boundary |' },
    { state: 'q1', input: 'Space', next: 'q5', action: 'End Word, Insert |' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto p-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-white mb-6">State Transition Table (δ)</h1>
      <div className="bg-panel border border-panel-border rounded-lg overflow-hidden shadow-lg shadow-accent/5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-background border-b border-panel-border text-xs uppercase text-muted font-semibold tracking-wider">
              <th className="py-4 px-6">Current State (q)</th>
              <th className="py-4 px-6">Input Symbol (Σ)</th>
              <th className="py-4 px-6">Next State (q')</th>
              <th className="py-4 px-6">Action / Output (Γ)</th>
            </tr>
          </thead>
          <tbody className="text-sm font-mono">
            {transitions.map((t, i) => (
              <tr key={i} className="border-b border-panel-border hover:bg-background/50 transition-colors">
                <td className="py-4 px-6 text-accent">{t.state}</td>
                <td className="py-4 px-6 text-white">{t.input}</td>
                <td className="py-4 px-6 text-secondary">{t.next}</td>
                <td className="py-4 px-6 text-gray-400">{t.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
