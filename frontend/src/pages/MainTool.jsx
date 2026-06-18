import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AppShell from '../components/AppShell';
import Header from '../components/Header';
import InputConsole from '../components/InputConsole';
import PipelineStepper from '../components/PipelineStepper';
import CleanTokenPanel from '../components/CleanTokenPanel';
import MetadataPanel from '../components/MetadataPanel';
import CharacterStream from '../components/CharacterStream';
import DFAStatePanel from '../components/DFAStatePanel';
import TuringTape from '../components/TuringTape';
import TransitionLog from '../components/TransitionLog';
import NormalizationPanel from '../components/NormalizationPanel';
import LLMMeaningPanel from '../components/LLMMeaningPanel';

const API_BASE = 'http://localhost:3001/api';
const DEFAULT_TEXT = 'SndhGovt ne budgettt announce krdia!!! #SindhBudget2026';

export default function MainTool() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const testInput = searchParams.get('test');

  const [pipelineStage, setPipelineStage] = useState(0);
  const [characterStream, setCharacterStream] = useState([]);
  const [tape, setTape] = useState([]);
  const [headPosition, setHeadPosition] = useState(-1);
  const [transitions, setTransitions] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [llmMeaning, setLlmMeaning] = useState('');
  const [isLlmLoading, setIsLlmLoading] = useState(false);

  const resetState = () => {
    setPipelineStage(0);
    setCharacterStream([]);
    setTape([]);
    setHeadPosition(-1);
    setTransitions([]);
    setMetadata(null);
    setTokens([]);
    setLlmMeaning('');
    setIsLlmLoading(false);
  };

  const runTokenization = async (text) => {
    resetState();
    
    try {
      setPipelineStage(1); 
      
      const res = await fetch(`${API_BASE}/tokenize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      
      if (!data || !data.trace) {
        throw new Error("Invalid response from tokenization backend");
      }

      const charStreamAdapter = data.trace.map(t => ({
        char: t.readSymbol,
        type: t.symbolType
      }));

      const simulatedTape = [];
      data.trace.forEach(t => {
        if (t.writeSymbol === '|') simulatedTape.push('|');
        else simulatedTape.push(t.writeSymbol);
      });

      // Staggered reveals via setTimeout state updates
      setTimeout(() => {
        setCharacterStream(charStreamAdapter);
        setTransitions(data.trace);
        setPipelineStage(2);
      }, 300);

      setTimeout(() => {
        setTape(simulatedTape);
        setHeadPosition(simulatedTape.length - 1);
        setPipelineStage(3);
      }, 900);
      
      setTimeout(() => {
        setPipelineStage(4); 
      }, 1500);

      setTimeout(() => {
        setTokens(data.cleanTokens);
        setMetadata({
          languageType: data.languageType,
          detectedNoise: data.detectedNoise,
          detectedKeywords: data.detectedKeywords,
          automataDecision: data.automataDecision
        });
        setPipelineStage(5); 
        
        fetchLLMMeaning(data);
      }, 2000);

    } catch (err) {
      console.error("Tokenization error:", err);
    }
  };

  useEffect(() => {
    if (testInput) {
      runTokenization(testInput);
    }
  }, [testInput]);

  const fetchLLMMeaning = async (finalOutput) => {
    setIsLlmLoading(true);
    setPipelineStage(6); 
    try {
      const res = await fetch(`${API_BASE}/meaning`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalOutput) 
      });
      
      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }
      
      const data = await res.json();
      
      let meaningText = data.meaning || "";
      if (typeof meaningText === 'string' && (meaningText.includes('RESOURCE_EXHAUSTED') || meaningText.includes('429'))) {
        meaningText = "API Quota Exceeded. The Gemini LLM cannot provide contextual meaning at this time because your free API limit has been reached. However, the Automata tokenization works perfectly!";
      } else if (typeof meaningText === 'string' && meaningText.includes('Error:')) {
        meaningText = "Failed to generate meaning due to an upstream API error.";
      }
      
      setLlmMeaning(meaningText);
    } catch (err) {
      console.error("LLM Error:", err);
      setLlmMeaning("Failed to fetch contextual meaning. Please check the backend connection.");
    } finally {
      setIsLlmLoading(false);
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const leftPanel = (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="flex flex-col gap-2">
      <motion.div variants={staggerItem}><Header /></motion.div>
      <motion.div variants={staggerItem}><InputConsole defaultText={testInput || DEFAULT_TEXT} onRun={runTokenization} onReset={resetState} /></motion.div>
      <motion.div variants={staggerItem}><PipelineStepper currentStage={pipelineStage} /></motion.div>
      <AnimatePresence>
        {pipelineStage >= 5 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
            <CleanTokenPanel tokens={tokens} />
            <MetadataPanel data={metadata} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const rightPanel = (
    <div className="flex flex-col gap-2">
      <AnimatePresence>
        {pipelineStage >= 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative mb-2">
            {pipelineStage < 4 && <div className="absolute inset-0 border-2 border-accent/50 rounded-lg animate-pulse pointer-events-none z-10 shadow-[0_0_15px_rgba(139,92,246,0.3)]"></div>}
            <CharacterStream stream={characterStream} />
            <DFAStatePanel transitions={transitions} />
            <TransitionLog logs={transitions} />
          </motion.div>
        )}
        
        {pipelineStage >= 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative mb-2">
             {pipelineStage < 4 && <div className="absolute inset-0 border-2 border-accent/50 rounded-lg animate-pulse pointer-events-none z-10 shadow-[0_0_15px_rgba(139,92,246,0.3)]"></div>}
            <TuringTape tape={tape} headPosition={headPosition} />
          </motion.div>
        )}

        {pipelineStage >= 4 && metadata && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-2">
            <NormalizationPanel data={metadata} />
          </motion.div>
        )}

        {pipelineStage >= 6 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-2">
            <LLMMeaningPanel meaning={llmMeaning} isLoading={isLlmLoading} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return <AppShell leftPanel={leftPanel} rightPanel={rightPanel} />;
}
