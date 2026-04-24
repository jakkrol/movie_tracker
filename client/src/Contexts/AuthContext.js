import { createContext, useState, useContext, useEffect} from "react";

const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    useEffect(() =>{
        const handleEvent = () =>{
            const newToken = localStorage.getItem('token');
            setUser(prevUser => ({ ...prevUser, token: newToken }));
            console.log("Token updated in AuthContext!!!");
        }

        window.addEventListener('tokenUpdated', handleEvent);

        return () => {
            window.removeEventListener('tokenUpdated', handleEvent);
        }
    }, [])

    const login = (userData) => {
        console.log(userData);
        setUser(userData);
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);