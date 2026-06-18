import React, { useEffect, useRef } from 'react';

export default function TuringTape({ tape, headPosition }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current && headPosition >= 0) {
      const activeCell = scrollRef.current.children[headPosition];
      if (activeCell) {
        activeCell.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [headPosition, tape]);

  if (!tape || tape.length === 0) return null;

  return (
    <div className="bg-panel border border-panel-border rounded-lg p-5 mb-6 overflow-hidden">
      <h2 className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">Turing Tape Visualizer</h2>
      <div 
        ref={scrollRef}
        className="flex gap-1 overflow-x-auto pb-4 pt-2 px-2 custom-scrollbar scroll-smooth"
      >
        {tape.map((cell, i) => {
          const isHead = i === headPosition;
          const isBoundary = cell === '|';
          return (
            <div 
              key={i} 
              className={`flex flex-col items-center shrink-0 w-12 transition-all duration-300 ${isHead ? '-translate-y-2' : ''}`}
            >
              {isHead ? (
                <div className="text-accent text-[10px] font-bold mb-1 animate-bounce">▼</div>
              ) : (
                <div className="h-4"></div>
              )}
              <div 
                className={`w-10 h-12 flex items-center justify-center font-mono text-lg border rounded shadow-sm
                  ${isHead ? 'bg-accent/20 border-accent text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]' : 
                    isBoundary ? 'bg-warning/20 border-warning/50 text-warning' : 
                    'bg-background border-panel-border text-gray-400'}
                `}
              >
                {cell === ' ' ? '␣' : cell}
              </div>
              <div className="text-[9px] text-muted mt-1 font-mono">{i}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
