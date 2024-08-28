import axiosInstance from "@/fetchers/axios/axiosInstance";
import { Task } from "@/interfaces/Task";

const postTask = async (task: Task) => {
    const res = await axiosInstance.post(`/tasks?userId=${task.userId}`, task);
    return res
}

export default postTask