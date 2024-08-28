//hooks
import { useUserContext } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

//types
import { Task } from '@/interfaces/Task';

//helpers
import getStatusBadgeColor from '@/utils/getStatusBadgeColor';

//components
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import NotFound from './NotFound';

//fetchers
import { fetchTaskById } from '@/fetchers/tasksFetchers/fetchTasks';

function TaskDetailPage() {
    const { id } = useParams();
    const { state } = useUserContext();
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const fetchedTask = await fetchTaskById(state.userInfo?.id, id);
                if (fetchedTask.status === 200) {
                    setTask(fetchedTask.data[0]);
                    setLoading(false);
                }
            } catch (error) {
                console.log('🚀 ~ error:', error);
                setTask(null);
                setLoading(false);
            }
        })();
    }, [id, state.userInfo?.id]);

    return (
        <Container className='mt-5'>
            <Row className='justify-content-center'>
                {loading && <p>Loading...</p>}
                {task ? (
                    <Col md={8}>
                        <Card className='shadow-sm'>
                            <Card.Body>
                                <Card.Title
                                    as='h1'
                                    className='text-center mb-4'
                                >
                                    {task?.title}
                                </Card.Title>
                                <Card.Text>
                                    <strong>Detail:</strong> {task?.detail}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Due Date:</strong> {task?.dueDate}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Category:</strong> {task?.category}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Status:</strong>{' '}
                                    <span
                                        className={`badge bg-${getStatusBadgeColor(
                                            task?.status,
                                        )}`}
                                    >
                                        {task?.status}
                                    </span>
                                </Card.Text>
                                <Button
                                    variant='primary'
                                    onClick={() => navigate('/')}
                                >
                                    Back to Task List
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ) : (
                    !loading && <NotFound />
                )}
            </Row>
        </Container>
    );
}

export default TaskDetailPage;
