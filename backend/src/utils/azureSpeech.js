// utils/azureSpeech.js
import dotenv from "dotenv";
dotenv.config();

// Mock transcription if Azure is not configured
export const mockAzureTranscription = async (audioUrl) => {
	console.log(`🎧 Mock downloading audio from: ${audioUrl}`);
	await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate download delay
	return "Mock Azure: This is a dummy transcription generated using Azure Speech service.";
};

// If Azure SDK is available, real integration will go here.
// For now, return mocked data.
export const azureSpeechToText = async (audioUrl) => {
	if (!process.env.AZURE_SPEECH_KEY || !process.env.AZURE_SPEECH_REGION) {
		console.warn("⚠ Azure credentials not found! Returning mock transcription.");
		return mockAzureTranscription(audioUrl);
	}

	// 🔹 Placeholder for real Azure SDK integration
	// (You can later replace this with actual SDK code)
	return mockAzureTranscription(audioUrl);
};
