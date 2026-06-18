import React from 'react';

export default function MetadataPanel({ data }) {
  if (!data) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-panel border border-panel-border rounded-lg p-5">
        <h3 className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-2">Detected Language Type</h3>
        <div className="text-accent text-sm font-medium">{data.languageType}</div>
      </div>
      
      <div className="bg-panel border border-panel-border rounded-lg p-5">
        <h3 className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-3">Detected Noise</h3>
        {data.detectedNoise && data.detectedNoise.length > 0 && data.detectedNoise[0] !== 'None' ? (
          <ul className="space-y-2">
            {data.detectedNoise.map((n, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1 shrink-0"></span>
                <span className="text-gray-300 leading-snug">{n}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-muted text-xs italic">None detected</div>
        )}
      </div>
      
      <div className="bg-panel border border-panel-border rounded-lg p-5">
        <h3 className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-3">Detected Keywords</h3>
        {data.detectedKeywords && data.detectedKeywords.length > 0 && data.detectedKeywords[0] !== 'None' ? (
          <div className="flex flex-wrap gap-2">
            {data.detectedKeywords.map((kw, i) => (
              <span key={i} className="px-2 py-1 bg-warning/10 text-warning text-xs rounded border border-warning/20 font-mono">
                {kw}
              </span>
            ))}
          </div>
        ) : (
          <div className="text-muted text-xs italic">None detected</div>
        )}
      </div>

      <div className="bg-panel border border-panel-border rounded-lg p-4 flex items-center justify-between">
        <h3 className="text-[10px] font-semibold text-muted uppercase tracking-wider">Final Status</h3>
        <div className="text-accepted text-xs font-mono font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accepted animate-pulse"></span>
          {data.automataDecision || 'Successfully tokenized and normalized'}
        </div>
      </div>
    </div>
  );
}
