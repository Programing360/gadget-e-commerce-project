import axios from "axios"

export const useAxiosSecure = () => {
    const instance = axios.create({
        baseURL:'http://localhost:5000',
        withCredentials:true
    })
    return instance
}
