import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import MainTool from './pages/MainTool';
import AutomataModel from './pages/AutomataModel';
import TransitionTable from './pages/TransitionTable';
import TestCases from './pages/TestCases';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-gray-200 font-sans flex flex-col">
        <Navigation />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<MainTool />} />
            <Route path="/model" element={<AutomataModel />} />
            <Route path="/transitions" element={<TransitionTable />} />
            <Route path="/test-cases" element={<TestCases />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
