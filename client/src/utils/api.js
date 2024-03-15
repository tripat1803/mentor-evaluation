import axios from "axios";

export const Mentor_Id = "65f337fe70bd8dcdd153ae64";
export const privateAxios = axios.create({
    baseURL: "http://localhost:4000"
});