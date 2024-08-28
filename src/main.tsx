import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import routes from './routes';
import { UserProvider } from './context/UserContext';
import App from './App';

const clientId: string = import.meta.env.VITE_CLIENT_ID;
const router = createBrowserRouter(routes);
createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={clientId}>
        <Toaster
            position='top-center'
            expand={true}
        />
        <Provider store={store}>
            <UserProvider>
                <RouterProvider router={router}>
                    <StrictMode>
                        <App />
                    </StrictMode>
                </RouterProvider>
            </UserProvider>
        </Provider>
    </GoogleOAuthProvider>,
);
