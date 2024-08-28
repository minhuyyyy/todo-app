//hooks
import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useUserContext } from '@/context/UserContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

//components
import { Col, Container, Row } from 'react-bootstrap';
import { toast } from 'sonner';
import Input from '@/components/inputs/Input';
import SelectInput from '@/components/inputs/SelectInput';
import DatePickerComponent from '@/components/inputs/DatePicker';

//types
import { Inputs } from '@/types/Input';
import { Task } from '@/interfaces/Task';
import { TaskStatus } from '@/types/TaskStatus';

//helpers
import { format } from 'date-fns';

//selectors
import selectCategories from '@/redux/selectors/categoriesSelector';

//configs
import statusList from '@/configs/statusList';

//fetchers
import postTask from '@/fetchers/tasksFetchers/postTask';

const AddTaskPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('Open');
    const [showCategorySelect, setShowCategorySelect] = useState(false);
    const navigate = useNavigate();
    const { state } = useUserContext();

    const categories = useSelector(selectCategories);
    const handleDateChange = (date: Date | null) => {
        const dateObj = date ? new Date(date) : '';
        const formattedDate = format(dateObj, 'dd-MM-yyyy');
        setDueDate(formattedDate);
    };
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!state.userInfo) {
            toast.error('Please log in to save your task!');
        } else {
            const taskData: Task = {
                ...data,
                userId: state.userInfo.id,
                createdDate: format(new Date(), 'dd-MM-yyyy'),
                ...(dueDate && {
                    dueDate: dueDate,
                }),
                category,
                status: status as TaskStatus,
            };

            try {
                const resultAction = await postTask(taskData);

                if (resultAction.status === 201) {
                    toast.success('Task added successfully');
                    navigate('/');
                } else {
                    toast.error('Failed to add task');
                }
            } catch (error: any) {
                toast.error(error.message);
            }
        }
    };

    return (
        <>
            <h1 className='mb-4'>Add Task</h1>
            <div className='w-50 mx-auto'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='task-form'
                >
                    <Input
                        id='title'
                        onChange={(e) => setTitle(e.target.value)}
                        type='text'
                        value={title}
                        placeholder='Title:'
                        register={register}
                    />
                    {errors.title && (
                        <p style={{ color: 'red' }}>{errors.title.message}</p>
                    )}
                    <Input
                        id='detail'
                        onChange={(e) => setDetail(e.target.value)}
                        type='text'
                        value={detail}
                        placeholder='Detail:'
                        register={register}
                    />
                    {errors.detail && (
                        <p style={{ color: 'red' }}>{errors.detail.message}</p>
                    )}

                    <DatePickerComponent
                        onChange={(date: Date | null) => handleDateChange(date)}
                        value={dueDate}
                    />

                    <Container
                        fluid
                        className='my-2'
                    >
                        <Row>
                            <Col lg={!showCategorySelect ? 12 : 2}>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowCategorySelect(
                                            !showCategorySelect,
                                        );
                                    }}
                                    className='my-3 my-md-0'
                                >
                                    Add Category
                                </button>
                            </Col>
                            {showCategorySelect && (
                                <Col md={9}>
                                    <SelectInput
                                        className='mx-lg-4'
                                        data={categories}
                                        id='category'
                                        onChange={(
                                            e: ChangeEvent<HTMLSelectElement>,
                                        ) => setCategory(e.target.value)}
                                        value={category}
                                    />
                                </Col>
                            )}
                        </Row>
                    </Container>

                    <SelectInput
                        data={statusList}
                        id='status'
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                            setStatus(e.target.value)
                        }
                        value={status}
                    />

                    <button
                        type='submit'
                        className='mt-3'
                    >
                        Add Task
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddTaskPage;
