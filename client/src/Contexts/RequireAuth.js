import { Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";

function RequireAuth ({children}) {
    const {user} = useAuth();
    console.log(user);

    if(!user){
        console.log("log out")
        return <Navigate to="/" replace />
    }

    return children;
}

export default RequireAuth;