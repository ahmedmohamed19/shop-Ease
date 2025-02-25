import React, { createContext, useState, useEffect } from 'react';

export const authContextObj = createContext(AuthProvider);

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));


    // setToken(localStorage.getItem('token'));
    // useEffect(() => {
    //     setToken(localStorage.getItem('token'));
    // }, [])

    return (
        <authContextObj.Provider value={{ token, setToken }}>
            {children}
        </authContextObj.Provider>
    );
}
