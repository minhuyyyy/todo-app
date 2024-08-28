import { fetchUserTasks } from '@/fetchers/tasksFetchers/fetchTasks';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTasks = createAsyncThunk(
    'tasks/fetchUserTasks',
    async ({ userId, searchStr, status }, { rejectWithValue }) => {
        try {
            const response = await fetchUserTasks(userId, searchStr, status);
            if (response.status === 200) {
                return response.data;
            } else {
                return rejectWithValue('Failed to fetch tasks');
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);
