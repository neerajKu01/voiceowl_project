import express from "express";
import { azureTranscription } from "../controllers/azureTranscription.controller.js";

const router = express.Router();

// POST /api/azure-transcription
router.post("/", azureTranscription);

export default router;
