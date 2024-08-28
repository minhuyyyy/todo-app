import {
    createContext,
    ReactNode,
    useReducer,
    useContext,
    Dispatch,
    useEffect,
} from 'react';

//type
import { User } from '@/types/User';

interface UserState {
    userInfo: User | null;
}

interface UserAction {
    type: 'INIT' | 'LOGIN' | 'SET_PROFILE' | 'LOGOUT';
    payload?: {
        userInfo: User;
    };
}

const initialState: UserState = {
    userInfo: null,
};

const UserContext = createContext<{
    state: UserState;
    dispatch: Dispatch<UserAction>;
}>({
    state: initialState,
    dispatch: () => null,
});

const reducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case 'INIT': {
            return {
                ...state,
                userInfo: action.payload?.userInfo || null,
            };
        }
        case 'LOGIN': {
            const newState = {
                ...state,
                userInfo: action.payload?.userInfo || null, // Ensure the shape is correct
            };
            localStorage.setItem('user', JSON.stringify(newState));
            return newState;
        }
        case 'LOGOUT': {
            localStorage.removeItem('user');
            return {
                ...state,
                userInfo: null,
            };
        }
        default:
            return state;
    }
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : initial;
    });

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            dispatch({
                type: 'INIT',
                payload: {
                    userInfo: JSON.parse(savedUser).userInfo, // Ensure userInfo is correctly accessed
                },
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
