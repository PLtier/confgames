import Axios, { AxiosInstance } from "axios"

const api: AxiosInstance = Axios.create({
    baseURL: 'http://localhost:3003'
})

export default api