import axios from "axios";

export async function getHangars() {
    const res = await axios.get("/hangars");
    return res.data;
}
