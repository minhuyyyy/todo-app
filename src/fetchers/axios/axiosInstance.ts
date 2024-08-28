import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://64afbeaac60b8f941af4871f.mockapi.io',
})

export default axiosInstance;