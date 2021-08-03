import React, { useState } from 'react';

export const AuthContext = React.createContext({
    name: '',
    token: ''
});

export const AuthProvider = props => {
    const [user, setUser] = useState({
        name: localStorage.getItem('user') || '',
        token: localStorage.getItem('token') || ''
    });

    return (
        <AuthContext.Provider 
            value={{user, setUser}}
        >
            {props.children}
        </AuthContext.Provider>
    );
}