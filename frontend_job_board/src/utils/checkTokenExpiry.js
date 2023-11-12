import { jwtDecode } from "jwt-decode";

export const checkTokenExpiry = () => {
    let accessToken = localStorage.getItem("access_token");
    if (accessToken) {
        const { exp } = jwtDecode(accessToken);
        const expirationTime = (exp * 1000) - 110000;
        if (Date.now() >= expirationTime) {
            return true;
        };
        return false;
    };
};