import { useState } from "react";
import ApiService from "../services/ajaxservice.js";

export default function AllTranscripts() {
    const [transcriptList, setTranscriptList] = useState(null);
    const [loading, setLoading] = useState(false);

    const getAllTranscript = async () => {
        try {
            setLoading(true);
            const response = await ApiService.get('http://localhost:9001/api/transcriptions');
            setTranscriptList(response?.data?.data);
            alert("Data Fetched");
        } catch (error) {
            alert("something went wrong!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={getAllTranscript}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
            >
                getAllTranscript
            </button>
            {loading ? "Loading..." :

                <table style={{ width: '100%', border:'1px solid black' }}>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Url</th>
                            <th>createdAt</th>
                        </tr>
                    </thead>
                    {
                        transcriptList?.map((itm) => {
                            return <tbody>
                                <tr>
                                    <td>{itm._id}</td>
                                    <td><a href={itm.audioUrl} target="blank" style={{color:'blue'}}>{itm.audioUrl}</a></td>
                                    <td>{itm.createdAt}</td>
                                </tr>
                            </tbody>
                        })}
                </table>

            }
        </div>
    );
}
