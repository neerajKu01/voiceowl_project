import { Transcription, UploadAudioFile } from '../model/transcription.model.js';
import uploadOnCloudinary from "../utils/cloudinary.js";
import fs from 'fs';
import path from 'path';

// Create transcription entry (POST /api/transcriptions)
export const createTranscription = async (req, res) => {
	try {
		const { audioUrl } = req.body;

		if (!audioUrl) {
			return res.status(400).json({
				success: false,
				message: 'audioUrl is required',
			});
		}

		//  Mocking audio file download (No real download)
		console.info(` Mock downloading audio from: ${audioUrl}`);
		await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate download delay

		//  Mock transcription generation
		console.log(' Mock converting audio to text...');
		const mockTranscription = 'This is a dummy transcription text generated from the mocked audio.';

		//  Save to database
		const savedRecord = await Transcription.create({
			audioUrl,
			transcriptionText: mockTranscription,
			createdAt: new Date(),
		});

		res.status(201).json({
			success: true,
			message: 'Transcription saved successfully',
			data: savedRecord,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Fetch all transcriptions from last 30 days (GET /api/transcriptions)
// export const getAllTranscriptions = async (req, res) => {
// 	try {
// 		const result = await Transcription.find({
// 			createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
// 		}).sort({ createdAt: -1 }); // Sort latest first

// 		res.status(200).json({
// 			success: true,
// 			totalRecords: result.length,
// 			data: result,
// 		});
// 	} catch (error) {
// 		res.status(500).json({
// 			success: false,
// 			message: error.message,
// 		});
// 	}
// };

// Fetch transcriptions with pagination & filtering
export const getAllTranscriptions = async (req, res) => {
	try {
		const { page = 1, limit = 500, search = "", startDate, endDate } = req.query;

		const query = {};

		//  Keyword search in transcription text
		if (search) {
			query.transcriptionText = { $regex: search, $options: 'i' };
		}

		// 📅 Date range filtering
		if (startDate && endDate) {
			query.createdAt = {
				$gte: new Date(startDate),
				$lte: new Date(endDate),
			};
		}

		// 📄 Pagination logic
		const skip = (page - 1) * limit;

		const results = await Transcription.find(query)
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(parseInt(limit));

		const totalCount = await Transcription.countDocuments(query);

		res.status(200).json({
			success: true,
			totalRecords: totalCount,
			currentPage: Number(page),
			totalPages: Math.ceil(totalCount / limit),
			data: results,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};


// // POST - upload and transcribe
// export const uploadAndTranscribe = async (req, res) => {
// 	try {
// 		if (!req.file) {
// 			return res.status(400).json({ message: "No audio file uploaded!" });
// 		}

// 		// Step 1: Generate dummy transcription (mocking AI transcription)
// 		const dummyText = "Transcribed text from audio...";

// 		// Create record to save in MongoDB
// 		const newRecord = await Transcription.create({
// 			audioUrl: `uploads/${req.file.filename}`,
// 			transcriptionText: dummyText,
// 			createdAt: new Date(),
// 		});

// 		res.status(201).json({
// 			message: "Transcription completed!",
// 			AudioId: newRecord._id, // return id only (as per requirement)
// 		});
// 	} catch (error) {
// 		res.status(500).json({ message: error.message });
// 	}
// };



// -------- Upload & Transcribe Endpoint -------- //
export const uploadAndTranscribe = async (req, res) => {
	try {
		if (!req.file || !req.file.path) {
			return res.status(400).json({ message: "No audio file uploaded!" });
		}
		// Get actual file path
		const filePath = path.join('uploads', req.file.filename);

		// 1️⃣ Mock AI transcription (simulates processing)
		const transcriptionText = await mockAITranscription(filePath);

		// Upload new avatar to Cloudinary
		const response = await uploadOnCloudinary(filePath);
		if (!response.url) {
			throw new ApiError(400, "Error while uploading avatar");
		}

		const newRecord = await Transcription.create({
			audioUrl: response?.url || '',
			transcriptionText: transcriptionText,
			createdAt: new Date(),
		});

		res.status(201).json({
			message: "Transcription completed!",
			recordId: newRecord._id,
			audioUrl: response?.url,
		});

	} catch (error) {
		console.error("Upload Error:", error);  // Debugging
		return res.status(500).json({
			success: false,
			message: error.message || "Internal Server Error",
		});
	}
};


// Fetch single transcription by ID
export const getTranscriptionById = async (req, res) => {
	try {
		const { id } = req.query;

		const record = await Transcription.findById(id);
		if (!record) {
			return res.status(404).json({ success: false, message: "Record not found" });
		}

		res.status(200).json({
			success: true,
			data: record
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error fetching transcription",
			error: error.message,
		});
	}
};

// Delete transcription and audio file
export const deleteTranscription = async (req, res) => {
	try {
		const { id } = req.query;

		const record = await Transcription.findById(id);
		if (!record) {
			return res.status(404).json({ success: false, message: "Record not found" });
		}

		// Delete audio file if exists
		if (record.audioUrl) {
			const filePath = path.resolve(`./${record.audioUrl}`);
			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath);
			}
		}

		// Remove MongoDB entry
		await Transcription.findByIdAndDelete(id);

		res.status(200).json({ success: true, message: "Record deleted successfully" });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

export const getAudioFile = async (req, res) => {
	try {
		const { id } = req.query;
		const record = await Transcription.findById(id);

		if (!record) {
			return res.status(404).json({ message: "File not found!" });
		}

		return res.status(200).json({
			success: true,
			audioUrl: record.audioUrl, // Cloudinary file URL
			downloadUrl: record.audioUrl, // same for download
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
