//components
import Input from '@/components/inputs/Input';
import SelectInput from '@/components/inputs/SelectInput';
import { Button, Col, Container, Row } from 'react-bootstrap';
import TaskTable from '@/components/table/TaskTable';

//configs
import statusList from '@/configs/statusList';

//hooks
import { useUserContext } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//redux
import selectTasks from '@/redux/selectors/tasksSelector';
import { fetchTasks } from '@/redux/thunks/taskThunks/fetchTasks';

function ViewTasks() {
    const { state } = useUserContext();
    const tasks = useSelector(selectTasks);
    const dispatch = useDispatch();
    const [searchStr, setSearchStr] = useState('');
    const [status, setStatus] = useState('');

    const fetchUserTasks = () => {
        dispatch(
            fetchTasks({
                userId: state.userInfo?.id,
                searchStr: searchStr,
                status: status,
            }),
        );
    };

    useEffect(() => {
        fetchUserTasks();
    }, [state.userInfo?.id, dispatch]);
    return (
        <div className='container d-flex flex-column align-items-center '>
            {!state.userInfo ? (
                <h2 className='mb-4'>Please log in to view tasks</h2>
            ) : (
                <>
                    <h1 className='mb-4'>Tasks List</h1>
                    <Container fluid>
                        <Row>
                            <Col
                                xs={12}
                                sm={3}
                                lg={4}
                            >
                                <Input
                                    id='searchStr'
                                    onChange={(e) =>
                                        setSearchStr(e.target.value)
                                    }
                                    placeholder='Search for tasks from title or detail'
                                    value={searchStr}
                                />
                            </Col>
                            <Col
                                xs={12}
                                sm={3}
                                lg={4}
                            >
                                <SelectInput
                                    data={statusList}
                                    value={status}
                                    id='status'
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                            </Col>
                            <Col
                                xs={12}
                                sm={6}
                                lg={4}
                                className='my-3 my-sm-0'
                            >
                                <Button
                                    className=''
                                    variant='primary'
                                    onClick={() => {
                                        fetchUserTasks();
                                    }}
                                >
                                    Search
                                </Button>
                                <Button
                                    variant='secondary'
                                    className='mx-3'
                                    onClick={() => {
                                        dispatch(
                                            fetchTasks({
                                                userId: state.userInfo?.id,
                                            }),
                                        );
                                    }}
                                >
                                    Reset
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                    <TaskTable tasks={tasks} />
                </>
            )}
        </div>
    );
}

export default ViewTasks;
