import { createContext, useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const TokenContext = createContext(null);

export const TokenProvider = props => {

    const [tokenExpired, setTokenExpired] = useState(null);

    useEffect(() => {
        let accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            const { exp } = jwtDecode(accessToken);
            const expirationTime = (exp * 1000) - 110000;
            if (Date.now() >= expirationTime) {
                localStorage.clear();
                setTokenExpired(true);
                redirect("/login");
            };
        };
    }, []);

    return (
        <TokenContext.Provider value={tokenExpired}>
            {props.children}
        </TokenContext.Provider>
    );
};