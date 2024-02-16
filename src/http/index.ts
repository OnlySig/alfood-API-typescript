import axios from "axios";

export const httpV2 = axios.create({
    baseURL: 'http://localhost:8000/api/v2/'
})

export const httpV1 = axios.create({
    baseURL: 'http://localhost:8000/api/v1/'
})
