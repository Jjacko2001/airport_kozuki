import axios from "axios";

export async function getPistes() {
    const res = await axios.get("/piste");
    return res.data;
}
