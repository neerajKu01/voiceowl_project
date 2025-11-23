import express from 'express';
import {
  createTranscription,
  getAllTranscriptions,
} from '../controllers/transcription.controller.js';

const router = express.Router();

router.post('/', createTranscription); // Create new transcription
router.get('/', getAllTranscriptions); // Get all last 30 days records

export default router;
