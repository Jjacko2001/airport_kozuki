import { httpClient } from "./httpClient.ts";
export const getVols = () => httpClient.get("/vols");
export const updateVol = (id: number, data: any) => httpClient.put(`/vols/${id}`, data);
export const createVol = (data: any) => httpClient.post("/vols", data);
export const deleteVol = (id: number) => httpClient.delete(`/vols/${id}`);
