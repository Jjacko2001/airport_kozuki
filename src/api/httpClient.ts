import axios from "axios";
export const httpClient = axios.create({
    baseURL: "http://localhost:8080" //"/api" //import.meta.env.VITE_API_BASE_URL, dans notre .env qui étati htt..localh..:8080
});
