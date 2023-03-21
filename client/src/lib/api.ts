import axios from "axios";
import { ApiProps } from "../types";

export default async ({url, method, body}: ApiProps) => {
    const token = localStorage.getItem("token");
    const request = {
        url: import.meta.env.VITE_SERVER_ENDPOINT + url,
        method,
        data: body,
        headers: {
            Authorization : `Bearer ${token}`
        }
    }   
    return await axios(request);
}