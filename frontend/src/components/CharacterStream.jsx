import React from 'react';

export default function CharacterStream({ stream }) {
  if (!stream || stream.length === 0) return null;

  return (
    <div className="bg-panel border border-panel-border rounded-lg p-5 mb-6">
      <h2 className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">Character Stream</h2>
      <div className="overflow-y-auto max-h-60 pr-2 custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-panel-border text-[10px] uppercase text-muted font-semibold tracking-wider">
              <th className="py-2 font-mono">Idx</th>
              <th className="py-2">Char</th>
              <th className="py-2">Category</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {stream.map((item, i) => (
              <tr key={i} className="border-b border-panel-border/50 hover:bg-background/50 transition-colors">
                <td className="py-2 text-muted font-mono">{i}</td>
                <td className="py-2 font-mono text-white bg-background/50 w-8 text-center rounded block mt-1">{item.char === ' ' ? '␣' : item.char}</td>
                <td className="py-2 pl-3 text-gray-300">{item.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
