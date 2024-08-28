//components
import DatePickerComponent from '@/components/inputs/DatePicker';
import Input from '@/components/inputs/Input';
import { Button, Container } from 'react-bootstrap';
import SelectInput from '@/components/inputs/SelectInput';
import NotFound from './NotFound';
import { toast } from 'sonner';

//hooks
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUserContext } from '@/context/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

//fetchers
import { fetchTaskById } from '@/fetchers/tasksFetchers/fetchTasks';

//configs
import statusList from '@/configs/statusList';

//redux
import selectCategories from '@/redux/selectors/categoriesSelector';
import updateUserTask from '@/redux/thunks/taskThunks/updateTask';

//helpers
import { format } from 'date-fns';

function EditTaskPage() {
    const { id } = useParams();
    const [task, setTask] = useState({});
    const { state } = useUserContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const categories = useSelector(selectCategories);
    const dispatch = useDispatch();
    const [error, setError] = useState(0);

    const handleInputChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date) => {
        const dateObj = date ? new Date(date) : '';
        const formattedDate = format(dateObj, 'dd-MM-yyyy');
        setTask({
            ...task,
            dueDate: formattedDate,
        });
    };

    const onSubmit = async (data) => {
        if (!state.userInfo) {
            toast.error('Please log in to save your task!');
        } else {
            const taskData = {
                ...task,
                ...data,
                userId: state.userInfo.id,
                ...(task.dueDate && {
                    dueDate: task.dueDate,
                }),
                category: task.category,
                status: task.status,
            };

            try {
                dispatch(updateUserTask(taskData));

                toast.success('Task updated successfully');
                navigate('/');
            } catch (error) {
                toast.error(error.message);
            }
        }
    };
    useEffect(() => {
        (async () => {
            try {
                const res = await fetchTaskById(state.userInfo?.id, id);
                if (res.status === 200) {
                    setTask(res.data[0]);
                }
            } catch (error) {
                setError(404);
                toast.error(error.message);
            }
        })();
    }, []);

    if (error === 404) {
        return <NotFound />;
    }

    return (
        <>
            {task && (
                <>
                    <h1>Update Task</h1>
                    <div className='w-50 mx-auto'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                id='title'
                                onChange={(e) => handleInputChange(e)}
                                placeholder='Title:'
                                register={register}
                                value={task.title}
                            />
                            {errors.title && (
                                <p style={{ color: 'red' }}>
                                    {errors.title.message}
                                </p>
                            )}
                            <Input
                                id='detail'
                                onChange={(e) => handleInputChange(e)}
                                placeholder='Detail:'
                                register={register}
                                value={task.detail || ''}
                            />
                            {errors.detail && (
                                <p style={{ color: 'red' }}>
                                    {errors.detail.message}
                                </p>
                            )}
                            <DatePickerComponent
                                onChange={(date) => handleDateChange(date)}
                                value={task.dueDate}
                            />
                            <SelectInput
                                data={categories}
                                id='category'
                                onChange={(e) => handleInputChange(e)}
                                value={task.category || ''}
                            />
                            <SelectInput
                                className='my-3'
                                data={statusList}
                                id='status'
                                onChange={(e) => handleInputChange(e)}
                                value={task.status || ''}
                            />
                            <Container
                                fluid
                                className='d-flex flex-row justify-content-center'
                            >
                                <Button
                                    variant='danger'
                                    className='mx-3'
                                    onClick={() => navigate('/')}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant='primary'
                                    type='submit'
                                >
                                    Save
                                </Button>
                            </Container>
                        </form>
                    </div>
                </>
            )}
        </>
    );
}

export default EditTaskPage;
