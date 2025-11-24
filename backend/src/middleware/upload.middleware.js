// multer setup to handle audio uploads
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

// Storage engine for files
const storage = multer.diskStorage({
	// store files in uploads folder
	destination: (req, file, cb) => { cb(null, "uploads/"); },

	filename: (req, file, cb) => {
		const uniqueName = uuidv4() + path.extname(file.originalname); // rename file uniquely
		cb(null, uniqueName);
	},
});

export const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });


// Setup Cloudinary storage
