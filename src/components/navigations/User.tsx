//context
import { useUserContext } from '@/context/UserContext';

function UserComponent() {
    const { state } = useUserContext();
    const user = state.userInfo;
    return (
        <div className='d-flex'>
            <img
                src={user!.picture}
                alt={user!.name}
                className='rounded-circle'
                style={{ width: '35px', height: '35px' }}
            />
        </div>
    );
}

export default UserComponent;
