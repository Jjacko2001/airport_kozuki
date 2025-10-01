import {httpClient} from "./httpClient.ts";
export const getPistes = () => httpClient.get("/pistes");
export const updatePistes = (id: number, data: any) => httpClient.put(`/pistes/${id}`, data);
export const createPiste = (data: any) => httpClient.post("/pistes", data);
export const deletePiste = (id: number) => httpClient.delete(`/pistes/${id}`);