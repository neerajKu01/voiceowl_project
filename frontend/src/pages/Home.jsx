import { useState } from "react";
import FileUpload from "../components/FileUpload";
import AudioPlayer from "../components/AudioPlayer";
import AllTranscripts from "../components/AllTranscripts"

export default function Home() {
    const [result, setResult] = useState(null);

    return (
        <>
        <div className="p-10">
            <h1 className="text-3xl font-bold text-center mb-6">VoiceOwl Audio Transcription</h1>
            <div class="grid grid-cols-2 gap-4">
                <div> <FileUpload setResult={setResult} /></div>
                <div> 
                    <p>Uploaded Transcript</p>
                    {result?.audioUrl && (
                    <AudioPlayer url={result.audioUrl} />
                )}</div>
            </div>
        </div>
         <div className="p-10 grid grid-cols-1">
            <h1 className="text-3xl font-bold text-center mb-6"> Lists all transcriptions</h1>
            <AllTranscripts></AllTranscripts>
            </div>
        </>

    );
}
