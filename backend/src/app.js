import express from 'express';
import cors from 'cors';
import transcriptionRoutes from './routes/transcription.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Base API route
app.use('/api/transcriptions', transcriptionRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('VoiceOwl Backend API is running 🚀');
});
export default app;
