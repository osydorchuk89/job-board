import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: null,
    accessToken: "",
    changeLoggedIn: () => { },
    changeToken: () => { }
});