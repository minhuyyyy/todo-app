import updateTask from '@/fetchers/tasksFetchers/updateTask';
import { createAsyncThunk } from '@reduxjs/toolkit';

const updateUserTask = createAsyncThunk(
    'tasks/updateTask',
    async (task, { rejectWithValue }) => {
        const res = await updateTask(task);
        if (res.status === 200) {
            return res.data;
        } else {
            return rejectWithValue('Failed to update task');
        }
    },
);

export default updateUserTask;
