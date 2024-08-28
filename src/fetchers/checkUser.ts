import axiosInstance from "@/fetchers/axios/axiosInstance";

const checkUser = async (userId: string) => {
    const res = await axiosInstance.get(`/users?id=${userId}`);
    return res;
}

export default checkUser