import { TaskStatus } from "@/types/TaskStatus";

export interface Task {
    id?: string;
    userId?: string;
    title: string;
    detail: string;
    dueDate?: string;
    createdDate: string;
    category: string;
    status: TaskStatus;
}


