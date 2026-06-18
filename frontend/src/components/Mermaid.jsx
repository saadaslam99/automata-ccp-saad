import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#0A0A0B',
    primaryTextColor: '#E2E8F0',
    primaryBorderColor: '#8B5CF6',
    lineColor: '#06B6D4',
    secondaryColor: '#1F1F22',
    tertiaryColor: '#0A0A0B',
    edgeLabelBackground: '#000000',
    fontFamily: 'JetBrains Mono',
  },
});

export default function Mermaid({ chart }) {
  const chartRef = useRef(null);

  useEffect(() => {
    // Cleanup any lingering global error boxes from previous hot-reloads
    const cleanupErrors = () => {
      const errorBoxes = document.querySelectorAll('svg[id^="dmermaid"]');
      errorBoxes.forEach(box => box.remove());
    };

    if (chartRef.current) {
      cleanupErrors();
      mermaid.render(`mermaid-${Math.random().toString(36).substr(2, 9)}`, chart)
        .then(({ svg }) => {
          if (chartRef.current) {
            chartRef.current.innerHTML = svg;
          }
          cleanupErrors(); // Clean up just in case
        })
        .catch(err => {
          console.error("Mermaid render error:", err);
          cleanupErrors();
        });
    }
    
    return cleanupErrors;
  }, [chart]);

  return <div ref={chartRef} className="mermaid-container flex justify-center overflow-x-auto w-full pb-4" />;
}
