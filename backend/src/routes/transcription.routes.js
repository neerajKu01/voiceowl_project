import express from 'express';
import { upload } from "../middleware/upload.middleware.js";
import {
	createTranscription,
	getAllTranscriptions,
	uploadAndTranscribe,
	getTranscriptionById,
	deleteTranscription,
	getAudioFile
} from '../controllers/transcription.controller.js';

const router = express.Router();

router.post('/', createTranscription); // Create new transcription
router.get('/', getAllTranscriptions); // Get all last 30 days records
router.post("/upload-audio", upload.single("audioFile"), uploadAndTranscribe);
// NEW - Fetch transcription by ID
router.get('/get-transcription-by-id', getTranscriptionById);
router.get('/delete-transcript', deleteTranscription);
router.get("/getAudioFile", getAudioFile);
export default router;
