import { Transcription } from "../model/transcription.model.js";
import { azureSpeechToText } from "../utils/azureSpeech.js";

export const azureTranscription = async (req, res) => {
  try {
    const { audioUrl } = req.body;

    if (!audioUrl) {
      return res.status(400).json({
        success: false,
        message: "audioUrl is required",
      });
    }

    console.log("🎯 Processing Azure transcription for:", audioUrl);

    // Step 1: Call Azure (or mock)
    const transcriptionText = await azureSpeechToText(audioUrl);

    // Step 2: Save to MongoDB
    const savedRecord = await Transcription.create({
      audioUrl,
      transcriptionText,
      source: "azure",
      createdAt: new Date(),
    });

    // Step 3: Respond with ID only
    res.status(201).json({
      success: true,
      message: "Azure transcription completed!",
      recordId: savedRecord._id,
    });
  } catch (error) {
    console.error("Azure transcription error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
    });
  }
};
