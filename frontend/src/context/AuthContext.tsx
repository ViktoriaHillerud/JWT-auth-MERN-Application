import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';

interface AuthState {
    user: { email: string; token: string } | null;
}

interface AuthAction {
    type: 'LOGIN' | 'LOGOUT';
    payload?: { email: string; token: string };
}


export interface AuthContextType extends AuthState { 
    dispatch: Dispatch<AuthAction>;
}

const defaultState: AuthState = { user: null };
export const AuthContext = createContext<AuthContextType>({
    ...defaultState,
    dispatch: () => null, 
});


// eslint-disable-next-line react-refresh/only-export-components
export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload || null };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
};

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, defaultState);

    console.log("AuthContext state: ", state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
