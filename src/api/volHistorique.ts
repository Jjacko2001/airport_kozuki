import { httpClient } from "./httpClient.ts";
export const getVolHistorique = (volId: number) => httpClient.get(`/volHistorique/${volId}`);

