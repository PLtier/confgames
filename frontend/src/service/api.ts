import Axios, { AxiosInstance } from "axios"

const api: AxiosInstance = Axios.create({
    baseURL: '/'
})

export default api