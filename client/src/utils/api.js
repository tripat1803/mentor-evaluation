import axios from "axios";

export const Mentor_Id = "65f3fcd5679e5bc6f48ec4a2";
export const privateAxios = axios.create({
    baseURL: "http://localhost:4000"
});