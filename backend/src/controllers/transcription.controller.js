import Transcription from '../model/transcription.model.js';

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
    console.log(` Mock downloading audio from: ${audioUrl}`);
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
export const getAllTranscriptions = async (req, res) => {
  try {
    const result = await Transcription.find({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ createdAt: -1 }); // Sort latest first

    res.status(200).json({
      success: true,
      totalRecords: result.length,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
