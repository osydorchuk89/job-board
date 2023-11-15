import { useState } from "react";
import { App } from "./App";
import { AuthContext } from "./store/AuthContext";
import { UserQueryContext } from "./store/UserQueryContext";
import { ProfileContext } from "./store/ProfileContext";
import { CssVarsProvider } from "@mui/joy";
import { Theme } from "./themes/themes";

export const AppWrapper = () => {

    const [userQuery, setUserQuery] = useState({
        vacancyTitle: null,
        vacancyCompany: null,
        vacancyCity: null,
        vacancyRecruiter: null
    });

    const [userAuthStatus, setUserAuthStatus] = useState({
        isLoggedIn: null,
        justLoggedIn: null,
        justLoggedOut: null,
        userType: null,
    });

    const [userProfile, setUserProfile] = useState({
        justRegistered: null,
        justEditedProfile: null,
        justApplied: null,
        justPostedVacancy: null,
        justEditedVacancy: null,
        justDeletedVacancy: null
    });

    const setUserAuthStatusFunction = value => setUserAuthStatus(value);
    const setUserQueryFunction = value => setUserQuery(value);
    const setUserProfileFunction = value => setUserProfile(value);

    const authContextValue = {
        authStatus: userAuthStatus,
        changeAuthStatus: setUserAuthStatusFunction,
    };

    const userQueryContextValue = {
        query: userQuery,
        changeQuery: setUserQueryFunction,
    };

    const userProfileContextValue = {
        profile: userProfile,
        changeProfile: setUserProfileFunction
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            <UserQueryContext.Provider value={userQueryContextValue}>
                <ProfileContext.Provider value={userProfileContextValue}>
                    <CssVarsProvider theme={Theme}>
                        <App />
                    </CssVarsProvider>
                </ProfileContext.Provider>
            </UserQueryContext.Provider>
        </AuthContext.Provider>
    );
};
