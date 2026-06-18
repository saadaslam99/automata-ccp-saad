import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function NormalizationPanel({ data }) {
  if (!data || !data.detectedNoise || data.detectedNoise.length === 0 || data.detectedNoise[0] === 'None') return null;

  return (
    <div className="bg-panel border border-panel-border rounded-lg p-5 mb-6">
      <h2 className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">Noise Normalization Applied</h2>
      <div className="flex flex-col gap-3">
        {data.detectedNoise.map((rule, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-background border border-panel-border rounded text-sm">
            <div className="flex-1 text-gray-300 font-mono text-xs">{rule}</div>
            <ArrowRight className="w-4 h-4 text-accent" />
            <div className="flex-1 text-accepted font-mono text-xs text-right">Normalized</div>
          </div>
        ))}
      </div>
    </div>
  );
}
