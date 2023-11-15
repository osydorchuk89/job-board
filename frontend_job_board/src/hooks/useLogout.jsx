import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

export const useLogout = () => {

    const { changeAuthStatus } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        changeAuthStatus({
            isLoggedIn: false,
            userType: null,
            justLoggedOut: true
        });
        navigate("/");
    };

    return handleLogout;
};