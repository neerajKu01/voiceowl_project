import mongoose from 'mongoose';

// Define schema for transcription data
const transcriptionSchema = new mongoose.Schema(
	{
		audioUrl: {
			type: String,
			required: true, // audioUrl is mandatory
		},
		transcriptionText: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true } // Adds createdAt and updatedAt auto
);

// Create model from schema and export


// Define schema for transcription data
const uploadAudioFile = new mongoose.Schema(
	{
		audioUrl: {
			type: String,
			required: true, // audioUrl is mandatory
		},
		transcription: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true } // Adds createdAt and updatedAt auto
);

export const UploadAudioFile = mongoose.model('UploadAudioFile', uploadAudioFile);
export const Transcription = mongoose.model('Transcription', transcriptionSchema);
