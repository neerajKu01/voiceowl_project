export default function AudioPlayer({ url }) {
    return (
        <div className="mt-6 p-4 border rounded-md shadow-md">
            <h3 className="text-lg font-bold">Transcribed Audio</h3>
            <audio controls src={url} className="mt-2 w-full"></audio>
            <p className="mt-2">
                <strong>File URL: </strong>
                <a href={url} target="_blank" className="text-blue-600 underline">
                    {url}
                </a>
            </p>
        </div>
    );
}
