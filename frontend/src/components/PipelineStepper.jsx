import React from 'react';

export default function PipelineStepper({ currentStage }) {
  const stages = [
    'Raw Input',
    'Char DFA',
    'Boundary DFA',
    'Normalization',
    'Keyword Match',
    'Clean Tokens',
    'LLM Context'
  ];

  return (
    <div className="bg-panel border border-panel-border rounded-lg p-5 mb-6">
      <h2 className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">Execution Pipeline</h2>
      <div className="flex flex-wrap gap-2 items-center">
        {stages.map((stage, i) => {
          const isActive = i <= currentStage;
          const isCurrent = i === currentStage;
          return (
            <React.Fragment key={stage}>
              <div className={`px-2 py-1 text-[11px] rounded font-mono transition-colors ${isCurrent ? 'bg-accent/20 border border-accent/50 text-accent' : isActive ? 'bg-panel-border text-gray-300 border border-transparent' : 'bg-background text-gray-600 border border-panel-border'}`}>
                {stage}
              </div>
              {i < stages.length - 1 && (
                <div className={`w-3 h-[1px] ${isActive ? 'bg-accent/50' : 'bg-panel-border'}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
