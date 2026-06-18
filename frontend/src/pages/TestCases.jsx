import React from 'react';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TestCases() {
  const navigate = useNavigate();
  
  const testCases = [
    { name: 'Missing Spaces', text: 'SndhGovt ne budgettt announce krdia!!!' },
    { name: 'Hashtag Compound', text: 'Thank you #SindhBudget2026 for the funds' },
    { name: 'Repeated Noise', text: 'yeeessss it is trueeeeee' },
    { name: 'Code-Mixed Standard', text: 'aaj main ne university jana hai for exam' },
    { name: 'Extreme Noise', text: 'g0vtttt isss doinggg #GreatWorkkk' }
  ];

  const handleRun = (text) => {
    navigate(`/?test=${encodeURIComponent(text)}`);
  };

  return (
    <div className="max-w-[1200px] mx-auto p-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-white mb-6">Predefined Test Cases</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testCases.map((tc, i) => (
          <div key={i} className="bg-panel border border-panel-border rounded-lg p-6 shadow-lg shadow-accent/5 hover:border-accent/30 transition-colors group">
            <h2 className="text-sm font-semibold text-accent mb-3 uppercase tracking-wider">{tc.name}</h2>
            <div className="bg-background border border-panel-border rounded p-4 mb-4">
              <code className="text-gray-300 text-sm font-mono">{tc.text}</code>
            </div>
            <button 
              onClick={() => handleRun(tc.text)}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white bg-accent/20 hover:bg-accent hover:text-black border border-accent/50 px-4 py-2 rounded transition-all w-full justify-center"
            >
              <Play className="w-4 h-4" /> Run in Main Tool
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
