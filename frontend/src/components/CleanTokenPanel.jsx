import React from 'react';

export default function CleanTokenPanel({ tokens }) {
  if (!tokens || tokens.length === 0) return null;

  return (
    <div className="bg-panel border border-panel-border rounded-lg p-5 mb-6">
      <h2 className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">Final Clean Tokens</h2>
      <div className="flex flex-wrap gap-2">
        {tokens.map((token, i) => (
          <span key={i} className="px-3 py-1.5 bg-accepted/10 text-accepted border border-accepted/20 rounded font-mono text-xs shadow-sm">
            {token}
          </span>
        ))}
      </div>
    </div>
  );
}
