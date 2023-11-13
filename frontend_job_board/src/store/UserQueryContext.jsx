import { createContext } from "react";

export const UserQueryContext = createContext({
    query: null,
    changeQuery: () => { }
});
