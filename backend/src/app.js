import express from 'express';
import cors from 'cors';
import transcriptionRoutes from './routes/transcription.routes.js';
import azureRoutes from "./routes/azure.routes.js";

const app = express();

app.use(cors({
	origin: process.env.CORS_ORIGIN || "*",
}));

// Body parser, reading data from body into req.body
app.use(
	express.json({
		limit: "100mb",
	})
);

// URL Encoding for req.body
app.use(
	express.urlencoded({
		limit: "100mb",
		extended: true,
		parameterLimit: 1000000,
	})
);

// Default route
app.get('/', (req, res) => {
	res.send('VoiceOwl Backend API is running 🚀');
});

app.use('/api/transcriptions', transcriptionRoutes);

// Serve uploaded files publicly (so frontend can access audio)
app.use('/uploads', express.static('uploads'));
app.use("/api/azure-transcription", azureRoutes);

export default app;
