import {httpClient} from "./httpClient.ts";
export const getHangars = () => httpClient.get("/hangars");
export const updateHangars = (id: number, data: any) => httpClient.put(`/hangars/${id}`, data);
export const createHangar = (data: any) => httpClient.post("/hangars", data);
export const deleteHangar = (id: number) => httpClient.delete(`/hangars/${id}`);