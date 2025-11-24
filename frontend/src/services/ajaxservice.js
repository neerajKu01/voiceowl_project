
import axios from "axios";

const API = axios.create();

const ApiService = {
	get: (url, params = {}) => API.get(url, { params }),

	post: (url, data = {}) => API.post(url, data),

	uploadFile: (url, formData) =>
		API.post(url, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		}),
};

export default ApiService;

