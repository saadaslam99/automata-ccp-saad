import React, { useEffect, useRef } from 'react';

export default function TransitionLog({ logs }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  if (!logs || logs.length === 0) return null;

  return (
    <div className="bg-panel border border-panel-border rounded-lg p-5 mb-6">
      <h2 className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">Execution Trace Log</h2>
      <div 
        ref={scrollRef}
        className="overflow-y-auto max-h-64 pr-2 custom-scrollbar flex flex-col gap-2 scroll-smooth"
      >
        {logs.map((log, i) => (
          <div key={i} className="flex flex-col gap-1 p-3 bg-background border border-panel-border rounded text-xs hover:border-accent/30 transition-colors">
            <div className="flex justify-between items-center border-b border-panel-border pb-2 mb-1">
              <span className="font-mono text-muted">Step {i + 1}</span>
              <div className="flex items-center gap-2 font-mono text-accent">
                {log.fromState} <span className="text-gray-500">→</span> {log.nextState}
              </div>
            </div>
            <div className="flex gap-4 mt-1">
              <span className="text-gray-400"><span className="text-muted">Read:</span> <span className="font-mono text-white">{log.readSymbol === ' ' ? '␣' : log.readSymbol}</span></span>
              <span className="text-gray-400"><span className="text-muted">Action:</span> <span className="text-warning">{log.action}</span></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
