import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useContext } from "react";
import { Home } from "./pages/Home";
import { VacancyPost } from "./pages/VacancyPost";
import { Contact } from "./pages/Contact";
import { Vacancies, vacanciesLoader } from "./pages/Vacancies";
import { VacancyDetails, vacancyDataLoader } from "./pages/VacancyDetails";
import { VacancyApplication } from "./pages/VacancyApplication";
import { VacancyEdit } from "./pages/VacancyEdit";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import { UserProfile } from "./pages/UserProfile";
import { UserProfileEdit } from "./pages/UserProfileEdit";
import { Applications, applicationsLoader } from "./pages/Applications";
import { Error } from "./pages/Error";
import { Root } from "./pages/Root";
import { AboutUs } from "./pages/AboutUs";
import { checkTokenExpiry } from "./utils/checkTokenExpiry";
import { AuthContext } from "./store/AuthContext";
import { UserQueryContext } from "./store/UserQueryContext";

export const App = () => {

    const { query } = useContext(UserQueryContext);
    const { changeAuthStatus } = useContext(AuthContext);

    useEffect(() => {
        if (localStorage.getItem("user_type") === "Candidates") {
            changeAuthStatus({
                isLoggedIn: true,
                userType: "Candidates"
            });
        };
        if (localStorage.getItem("user_type") === "Recruiters") {
            changeAuthStatus({
                isLoggedIn: true,
                userType: "Recruiters"
            });
        };
    }, [])

    useEffect(() => {
        setInterval(() => {
            const token_expired = checkTokenExpiry();
            if (token_expired) {
                localStorage.clear();
                changeAuthStatus({
                    isLoggedIn: false,
                    userType: null
                });
            };
        }, 60000)
    }, [])

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            errorElement: <Error />,
            id: "root",
            loader: () => {
                if (query) {
                    return vacanciesLoader(query)
                };
                return null;
            },
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: "login",
                    element: <Login />
                },
                {
                    path: "candidate-register",
                    element: <Registration />
                },
                {
                    path: "recruiter-register",
                    element: <Registration />
                },
                {
                    path: "my-profile",
                    children: [
                        {
                            index: true,
                            element: <UserProfile />
                        },
                        {
                            path: "applications",
                            loader: applicationsLoader,
                            element: <Applications />,
                        },
                        {
                            path: "edit",
                            element: <UserProfileEdit />
                        },
                    ]
                },
                {
                    path: "vacancy-post",
                    element: <VacancyPost />,
                },
                {
                    path: "contact",
                    element: <Contact />,
                },
                {
                    path: "about-us",
                    element: <AboutUs />
                },
                {
                    path: "vacancies",
                    children: [
                        {
                            index: true,
                            element: <Vacancies />
                        },
                        {
                            path: ":vacancyId",
                            id: "vacancy",
                            loader: vacancyDataLoader,
                            children: [
                                {
                                    index: true,
                                    element: <VacancyDetails />,
                                },
                                {
                                    path: "edit",
                                    element: <VacancyEdit />
                                },
                                {
                                    path: "apply",
                                    element: <VacancyApplication />
                                }
                            ]
                        },
                    ]
                },
            ]
        },
    ]);

    return (
        <RouterProvider router={router} history={history} />
    );
};