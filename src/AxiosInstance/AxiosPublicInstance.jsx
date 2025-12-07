import axios from "axios";

const axiosPublicInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    
});

const useAxiosPublic = () => {
    return axiosPublicInstance;
};

export default useAxiosPublic;