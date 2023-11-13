import { useState } from "react";
import { App } from "./App";
import { AuthContext } from "./store/AuthContext";
import { UserQueryContext } from "./store/UserQueryContext";

export const AppWrapper = () => {

    const [userQuery, setUserQuery] = useState({
        vacancyTitle: null,
        vacancyCompany: null,
        vacancyCity: null,
        vacancyRecruiter: null
    })

    const [userAuthStatus, setUserAuthStatus] = useState({
        isLoggedIn: null,
        userType: null
    });

    const setUserAuthStatusFunction = value => setUserAuthStatus(value);
    const setUserQueryFunction = value => setUserQuery(value);

    const authContextValue = {
        authStatus: userAuthStatus,
        changeAuthStatus: setUserAuthStatusFunction,
    };

    const userQueryContextValue = {
        query: userQuery,
        changeQuery: setUserQueryFunction,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            <UserQueryContext.Provider value={userQueryContextValue}>
                <App />
            </UserQueryContext.Provider>
        </AuthContext.Provider>
    );
};
