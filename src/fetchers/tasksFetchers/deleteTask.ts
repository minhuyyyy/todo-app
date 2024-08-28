import { toast } from "sonner";
import axiosInstance from "../axios/axiosInstance";

const deleteTask = async (taskId?: string, userId?: string) => {
    try {
        const res = await axiosInstance.delete(`/tasks/${taskId}?userId=${userId}`);
        if (res.status === 200) {
            toast.success('Task deleted successfully');
            return taskId; // Return the taskId if successful
        } else {
            toast.error('Failed to delete task');
            return null;
        }
    } catch (error: any) {
        toast.error(error.message);
        return null;
    }
};

export default deleteTask;
