//hooks
import { useEffect, useState } from 'react';

//validators
import { SubmitHandler, useForm } from 'react-hook-form';

//components
import { Col, Container, Row } from 'react-bootstrap';
import Input from '@/components/inputs/Input';
import SelectInput from '@/components/inputs/SelectInput';

//types
import { Inputs } from '@/types/Input';

//configs
import statusList from '@/configs/statusList';

interface TaskAddFormProps {
    initialValues?: Partial<Inputs>;
    categories: string[];
    onSubmit: SubmitHandler<Inputs>;
}

const TaskAddForm = ({
    initialValues = {},
    categories,
    onSubmit,
}: TaskAddFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ defaultValues: initialValues });

    const [showCategorySelect, setShowCategorySelect] = useState(false);

    // State to manage form values
    const [formValues, setFormValues] =
        useState<Partial<Inputs>>(initialValues);

    useEffect(() => {
        setFormValues(initialValues);
    }, [initialValues]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='task-form'
        >
            <Input
                id='title'
                {...register('title', { required: 'Title is required' })}
                type='text'
                placeholder='Title:'
                value={formValues.title}
            />
            {errors.title && (
                <p style={{ color: 'red' }}>{errors.title.message}</p>
            )}
            <Input
                value={formValues.detail}
                id='detail'
                {...register('detail')}
                type='text'
                placeholder='Detail:'
            />
            {errors.detail && (
                <p style={{ color: 'red' }}>{errors.detail.message}</p>
            )}
            <Input
                id='dueDate'
                {...register('dueDate', { required: 'Due date is required' })}
                type='date'
                placeholder='Due Date:'
            />
            <Container fluid>
                <Row>
                    <Col md={!showCategorySelect ? 12 : 2}>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setShowCategorySelect(!showCategorySelect);
                            }}
                        >
                            Add Category
                        </button>
                    </Col>
                    {showCategorySelect && (
                        <Col md={9}>
                            <SelectInput
                                data={categories}
                                id='category'
                                {...register('category')}
                            />
                        </Col>
                    )}
                </Row>
            </Container>
            <SelectInput
                value={formValues.status}
                data={statusList}
                id='status'
                {...register('status')}
            />
            <button
                type='submit'
                className='mt-3'
            >
                Add Task
            </button>
        </form>
    );
};

export default TaskAddForm;
