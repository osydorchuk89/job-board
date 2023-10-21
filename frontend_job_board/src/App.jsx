import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import { Home } from "./pages/Home";
import { JobSearch } from "./pages/JobSearch";
import { JobPost } from "./pages/JobPost";
import { Contact } from "./pages/Contact";
import { Vacancies } from "./pages/Vacancies";
import { VacancyDetails } from "./pages/VacancyDetails";
import { VacancyApplication } from "./pages/VacancyApplication";
import { Root } from "./pages/Root";

export const App = () => {

    const [userQueryValue, setUserQueryValue] = useState({});

    const onClickSearchDisplay = userQuery => {
        setUserQueryValue(userQuery);
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            children: [
                {
                    path: "/",
                    element: <Home onClickSearch={onClickSearchDisplay} />,
                },
                {
                    path: "/job-search",
                    element: <JobSearch />,
                },
                {
                    path: "/job-post",
                    element: <JobPost />,
                },
                {
                    path: "/contact",
                    element: <Contact />,
                },
                {
                    path: "/vacancies",
                    element: <Vacancies item={userQueryValue} />,
                },
                {
                    path: "/vacancies/:vacancyId",
                    element: <VacancyDetails />,
                },
                {
                    path: "/vacancies/:vacancyId/apply",
                    element: <VacancyApplication />,
                },
            ]
        },
    ]);

    return <RouterProvider router={router} />
};