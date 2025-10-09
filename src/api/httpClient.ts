import axios from "axios";
export const httpClient = axios.create({
    baseURL: "/api" //import.meta.env.VITE_API_BASE_URL, dans notre .env qui étati htt..localh..:8080
});
