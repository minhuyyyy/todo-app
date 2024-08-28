import { useState } from 'react';

//components
import UserComponent from './User';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

//helpers
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

//axios
import axios from 'axios';

//context
import { useUserContext } from '@/context/UserContext';

//fetchers
import checkUser from '@/fetchers/checkUser';
import axiosInstance from '@/fetchers/axios/axiosInstance';

function NavBar() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const { state, dispatch } = useUserContext();
    const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
    };
    const user = state.userInfo;

    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            try {
                const res = await axios.get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
                    {
                        headers: {
                            Authorization: `Bearer ${codeResponse.access_token}`,
                            Accept: 'application/json',
                        },
                    },
                );

                const user = res.data;
                console.log('🚀 ~ onSuccess: ~ user:', JSON.stringify(user));

                const userRes = await checkUser(user.id);

                if (userRes.status === 200) {
                    dispatch({
                        type: 'LOGIN',
                        payload: { userInfo: res.data },
                    });
                } else if (userRes.status === 404) {
                    const postUserRes = await axiosInstance.post('/users', {
                        user,
                    });

                    if (
                        postUserRes.status === 200 ||
                        postUserRes.status === 201
                    ) {
                        dispatch({
                            type: 'LOGIN',
                            payload: { userInfo: res.data },
                        });
                    }
                }
            } catch (error) {
                console.log('Login or user check failed:', error);
            }
        },
        onError: (error) => console.log('Login Failed:', error),
    });

    const logOut = (): void => {
        googleLogout();
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <Navbar
            expand='lg'
            className='bg-body-tertiary'
            onToggle={handleToggle}
            expanded={!isCollapsed}
        >
            <Container>
                <Navbar.Toggle
                    aria-controls='basic-navbar-nav'
                    onClick={handleToggle}
                />
                <Navbar.Collapse
                    role={'navigation'}
                    id='basic-navbar-nav'
                >
                    <Nav className='w-100 d-flex justify-content-around align-items-center'>
                        <Navbar.Brand href='/'>To do App</Navbar.Brand>
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href='/task/add'>Add task</Nav.Link>
                        {user ? (
                            <div className='d-flex align-items-center'>
                                <NavDropdown
                                    title={<UserComponent />}
                                    id='user-dropdown'
                                    align='end'
                                    className='no-arrow'
                                >
                                    <NavDropdown.Item>
                                        <p className='font-weight-bold'>
                                            {user.name}
                                        </p>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <p>{user.email}</p>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        onClick={logOut}
                                        className='text-danger'
                                    >
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        ) : (
                            <button
                                onClick={() => login()}
                                className='text-primary'
                            >
                                Login
                            </button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
