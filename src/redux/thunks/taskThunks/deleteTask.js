import { createAsyncThunk } from '@reduxjs/toolkit';
import deleteTask from '@/fetchers/tasksFetchers/deleteTask';

export const removeTask = createAsyncThunk(
    'tasks/removeTask',
    async ({ taskId, userId }, { rejectWithValue }) => {
        const deletedTaskId = await deleteTask(taskId, userId);
        if (deletedTaskId) {
            return { taskId: deletedTaskId };
        } else {
            return rejectWithValue('Failed to delete task');
        }
    },
);
