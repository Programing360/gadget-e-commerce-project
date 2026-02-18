import axios from "axios"

export const useAxiosSecure = () => {
    const instance = axios.create({
        baseURL:'https://zeromiroo-api.vercel.app',
        withCredentials:true
    })
    return instance
}
