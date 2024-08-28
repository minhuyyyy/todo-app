//components
import { Button, Table } from 'react-bootstrap';
import CustomIcon from '../Icon';
import SelectInput from '../inputs/SelectInput';
import { toast } from 'sonner';

//hooks
import { useState } from 'react';
import { useUserContext } from '@/context/UserContext';
import { useDispatch } from 'react-redux';

//configs
import statusList from '@/configs/statusList';

//redux
import { removeTask } from '@/redux/thunks/taskThunks/deleteTask';
import updateUserTask from '@/redux/thunks/taskThunks/updateTask';

const TaskTable = ({ tasks, error }) => {
    const { state } = useUserContext();
    const [showSaveButton, setShowSaveButton] = useState(false);
    const [status, setStatus] = useState('');
    const sortedTasks = [...tasks].sort(
        (a, b) =>
            new Date(b.createdDate).valueOf() -
            new Date(a.createdDate).valueOf(),
    );

    const dispatch = useDispatch();

    const handleDeleteTask = async (taskId) => {
        dispatch(removeTask({ taskId: taskId, userId: state.userInfo?.id }));
    };

    const handleStatusUpdate = async (taskId) => {
        let updatedTask = tasks.find((task) => task.id === taskId);
        if (!updatedTask) return;
        else {
            updatedTask = {
                ...updatedTask,
                status: status,
            };
            try {
                setTimeout(() => {
                    dispatch(updateUserTask(updatedTask));
                }, 1000);
                toast.success('Task status updated!');
                setShowSaveButton(false);
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    if (tasks.length === 0) {
        return <p>No tasks found</p>;
    }

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <Table
                    striped
                    bordered
                    hover
                >
                    <thead>
                        <tr className='align-middle'>
                            <th>Title</th>
                            <th>Detail</th>
                            <th>Due Date</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTasks.map((task, index) => (
                            <tr
                                key={index}
                                className='align-middle'
                            >
                                <td>{task.title}</td>
                                <td>{task.detail}</td>
                                <td>{task.dueDate}</td>
                                <td>{task.category}</td>
                                <td>
                                    <SelectInput
                                        data={statusList}
                                        id='status'
                                        onChange={(e) => {
                                            setStatus(e.target.value);
                                            setShowSaveButton(true);
                                        }}
                                        value={status || task.status}
                                    />
                                </td>
                                <td>
                                    <div className='d-flex flex-row justify-content-around align-items-baseline'>
                                        <div>
                                            <a href={`/task/detail/${task.id}`}>
                                                <CustomIcon
                                                    name='Eye'
                                                    color='blue'
                                                    size={24}
                                                />
                                            </a>
                                        </div>
                                        <div>
                                            <a href={`/task/edit/${task.id}`}>
                                                <CustomIcon
                                                    name='Pencil'
                                                    color='green'
                                                    size={24}
                                                />
                                            </a>
                                        </div>
                                        <div
                                            className='cursor-pointer'
                                            onClick={() =>
                                                handleDeleteTask(task?.id)
                                            }
                                        >
                                            <CustomIcon
                                                name='Trash2'
                                                color='red'
                                                size={24}
                                            />
                                        </div>
                                        {showSaveButton && (
                                            <Button
                                                onClick={() =>
                                                    handleStatusUpdate(task.id)
                                                }
                                            >
                                                Save changes
                                            </Button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default TaskTable;
