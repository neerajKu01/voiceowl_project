import { useState } from "react";
import ApiService from "../services/ajaxservice.js";

export default function FileUpload({ setResult }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (!file) return alert("Please choose an audio file!");

        const formData = new FormData();
        formData.append("audioFile", file);

        setLoading(true);
        try {
            const response = await ApiService.uploadFile('http://localhost:9001/api/transcriptions/upload-audio', formData);
            setResult(response.data);
            alert("Upload Success!");
        } catch (error) {
            alert("Upload failed!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 border rounded-lg shadow-lg max-w-md mx-auto mt-6">
            <h2 className="text-xl font-semibold mb-4">Upload Audio for Transcription</h2>
            <input
                type="file"
                accept="audio/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="mb-4 cursor-pointer border-2"
            />
            <button
                onClick={handleUpload}
                disabled={!file || loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
            >
                {loading ? "Uploading..." : "Upload & Transcribe"}
            </button>
        </div>
    );
}
