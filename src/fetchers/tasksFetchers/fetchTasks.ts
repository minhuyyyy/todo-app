import axiosInstance from '../axios/axiosInstance';

export const fetchUserTasks = async (userId?: string, searchStr?: string, status?: string) => {
    const tasksRes = await axiosInstance.get(`/tasks?userId=${userId}&title=${searchStr || ''}&detail=${searchStr || ''}&status=${status || ''}`);
    return tasksRes;
};

export const fetchTaskById = async (userId?: string, taskId?: string) => {
    const tasksRes = await axiosInstance.get(
        `/tasks?userId=${userId}${taskId && `&id=${taskId}`}`,
    );
    return tasksRes;
};

export const fetchTaskByStatus = async (userId?: string, status?: string) => {
    const tasksRes = await axiosInstance.get(`/tasks?userId=${userId}&status=${status}`);
    return tasksRes;
}