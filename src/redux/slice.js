//redux
import { createSlice } from '@reduxjs/toolkit';

//thunks
import { fetchTasks } from './thunks/taskThunks/fetchTasks';
import { removeTask } from './thunks/taskThunks/deleteTask';
import updateUserTask from './thunks/taskThunks/updateTask';

const initialState = {
    tasks: [],
    categories: ['Cooking', 'Learning', 'Cleaning', 'Shopping'],
};

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state, action) => {
            state.tasks = [];
        });
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.tasks = action.payload;
        });
        builder.addCase(removeTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.filter(
                (task) => task.id !== action.payload.taskId,
            );
        });
        builder.addCase(updateUserTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.map((task) => {
                if (task.id === action.payload.id) {
                    return action.payload;
                }
                return task;
            });
        });
    },
});
