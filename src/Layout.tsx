import { Outlet } from 'react-router-dom';
import NavBar from './components/navigations/Navbar';

function Layout() {
    return (
        <>
            <div className='mb-5'>
                <NavBar  />
            </div>
            <Outlet />
        </>
    );
}

export default Layout;
