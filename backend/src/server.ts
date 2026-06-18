import express from 'express';
import cors from 'cors';
import { buildTokenizationOutput } from './tokenizer/outputBuilder';
import { fetchContextualMeaning } from './llmMeaningService';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/tokenize', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }
  
  const output = buildTokenizationOutput(text);
  res.json(output);
});

app.post('/api/meaning', async (req, res) => {
  const output = req.body; 
  if (!output || !output.cleanTokens) {
    return res.status(400).json({ error: 'Valid Tokenizer Output is required' });
  }
  
  const meaning = await fetchContextualMeaning(output);
  res.json({ meaning });
});

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`VarToken Backend running on port ${PORT}`);
  });
}

export default app;
