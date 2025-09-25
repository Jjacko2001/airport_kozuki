import {httpClient} from "./httpClient.ts";
export const getAvions = () => httpClient.get("/avions");
export const updateAvions = (id: number, data: any) => httpClient.put(`/avions/${id}`, data);
export const createAvion = (data: any) => httpClient.post("/avions", data);
export const deleteAvion = (id: number) => httpClient.delete(`/avions/${id}`);