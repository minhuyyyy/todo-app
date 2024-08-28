import { Task } from "@/interfaces/Task";
import { fetchTaskById } from "./fetchTasks";
import axiosInstance from "../axios/axiosInstance";

const updateTask = async (task: Task) => {
    const availableTask = await fetchTaskById(task.userId, task.id);

    if (availableTask.status === 200) {
        if (task.userId !== availableTask.data[0].userId) {
            throw new Error('You are not authorized to update this task');
        } else {
            const res = await axiosInstance.put(`/tasks/${task.id}`, task);
            return res;
        }
    }
}

export default updateTask