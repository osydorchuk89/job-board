import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import { Home } from "./pages/Home";
import { JobPost } from "./pages/JobPost";
import { Contact } from "./pages/Contact";
import { Vacancies } from "./pages/Vacancies";
import { VacancyDetails } from "./pages/VacancyDetails";
import { VacancyApplication } from "./pages/VacancyApplication";
import { VacancyPosted } from "./pages/VacancyPosted";
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
                    path: "/job-post",
                    element: <JobPost />,
                },
                {
                    path: "/job-post/succesfully-posted",
                    element: <VacancyPosted />
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