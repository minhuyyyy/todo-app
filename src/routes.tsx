import Layout from './Layout';
import AddTaskPage from './pages/AddTask';
import EditTaskPage from './pages/EditTaskPage.jsx';
import NotFound from './pages/NotFound';
import TaskDetailPage from './pages/TaskDetailPage';
import ViewTasks from './pages/ViewTasks';

interface PageRoute {
    path: string;
    element: JSX.Element;
    children?: PageRoute[];
}

const routes: PageRoute[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <ViewTasks />,
            },
        ],
    },
    {
        path: '/task',
        element: <Layout />,
        children: [
            { path: 'add', element: <AddTaskPage /> },
            { path: 'detail/:id', element: <TaskDetailPage /> },
            { path: 'edit/:id', element: <EditTaskPage /> },
        ],
    },
    {
        path: '*',
        element: <Layout />,
        children: [{ path: '*', element: <NotFound /> }],
    },
];

export default routes;
