import { createBrowserRouter, RouterProvider, redirect, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { Home } from "./pages/Home";
import { VacancyPost } from "./pages/VacancyPost";
import { Contact } from "./pages/Contact";
import { Vacancies, vacanciesLoader } from "./pages/Vacancies";
import { VacancyDetails, vacancyDataLoader } from "./pages/VacancyDetails";
import { VacancyApplication } from "./pages/VacancyApplication";
import { VacancyPosted } from "./pages/VacancyPosted";
import { VacancyEdit } from "./pages/VacancyEdit";
import { VacancyEdited } from "./pages/VacancyEdited";
import { VacancyDeleted } from "./pages/VacancyDeleted";
import { VacancyApplied } from "./pages/VacancyApplied";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import { UserRegistered } from "./pages/UserRegistered";
import { UserProfile } from "./pages/UserProfile";
import { UserProfileEdit } from "./pages/UserProfileEdit";
import { ChangeLoginType } from "./pages/ChangeLoginType";
import { Applications, applicationsLoader } from "./pages/Applications";
import { Error } from "./pages/Error";
import { Root } from "./pages/Root";
import { LoggedOut } from "./pages/LoggedOut";
import { AboutUs } from "./pages/AboutUs";
import { UserProfileEdited } from "./pages/UserProfileEdited";
import { checkTokenExpiry } from "./utils/checkTokenExpiry";
import { AuthContext } from "./store/AuthContext";
import { UserQueryContext } from "./store/UserQueryContext";

export const App = () => {


    const { query } = useContext(UserQueryContext);
    const { authStatus, changeAuthStatus } = useContext(AuthContext);

    useEffect(() => {
        if (localStorage.getItem("user_type") === "candidate") {
            changeAuthStatus({
                isLoggedIn: true,
                userType: "candidate"
            });
        };
        if (localStorage.getItem("user_type") === "recruiter") {
            changeAuthStatus({
                isLoggedIn: true,
                userType: "recruiter"
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
                    loader: async () => {
                        if (authStatus.userType) {
                            return redirect("/");
                        };
                        return null;
                    },
                    element: <Login />
                },
                {
                    path: "candidate-register",
                    loader: async () => {
                        if (authStatus.userType) {
                            return redirect("/");
                        };
                        return null;
                    },
                    children: [
                        {
                            index: true,
                            element: <Registration />
                        },
                        {
                            path: "success",
                            element: <UserRegistered />
                        }
                    ]
                },
                {
                    path: "recruiter-register",
                    loader: async () => {
                        if (authStatus.userType) {
                            return redirect("/");
                        };
                        return null;
                    },
                    children: [
                        {
                            index: true,
                            element: <Registration />
                        },
                        {
                            path: "success",
                            element: <UserRegistered />
                        }
                    ]
                },
                {
                    path: "my-profile",
                    loader: async () => {
                        if (!authStatus.userType) {
                            return redirect("/login");
                        };
                        return null;
                    },
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
                        {
                            path: "edited",
                            element: <UserProfileEdited />
                        }
                    ]
                },
                {
                    path: "vacancy-post",
                    loader: async () => {
                        if (authStatus.userType === "recruiter") {
                            return null;
                        };
                        if (authStatus.userType === "candidate") {
                            return redirect("/change-login-type")
                        };
                        return redirect("/login");
                    },
                    children: [
                        {
                            path: "",
                            children: [
                                {
                                    index: true,
                                    element: <VacancyPost />,
                                },
                                {
                                    path: "posted",
                                    element: <VacancyPosted />
                                }
                            ]
                        },
                    ]
                },
                {
                    path: "change-login-type",
                    element: <ChangeLoginType />,
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
                                    loader: async () => {
                                        if (authStatus.userType !== "recruiter") {
                                            return redirect("/");
                                        };
                                        return null;
                                    },
                                    children: [
                                        {
                                            index: true,
                                            element: <VacancyEdit />
                                        },
                                        {
                                            path: "updated",
                                            element: <VacancyEdited />,
                                        },
                                    ]
                                },
                                {
                                    path: "apply",
                                    loader: async () => {
                                        if (authStatus.userType === "candidate") {
                                            return null;
                                        };
                                        if (authStatus.userType === "recruiter") {
                                            return redirect("/change-login-type")
                                        }
                                        return redirect("/login");
                                    },
                                    children: [
                                        {
                                            path: "",
                                            children: [
                                                {
                                                    index: true,
                                                    element: <VacancyApplication />
                                                }
                                            ]

                                        }
                                    ],
                                },
                                {
                                    path: "applied",
                                    element: <VacancyApplied />,
                                }
                            ]
                        },
                        {
                            path: "deleted",
                            element: <VacancyDeleted />,
                        },
                    ]
                },
                {
                    path: "logged-out",
                    element: <LoggedOut />
                }
            ]
        },
    ]);

    return (
        <RouterProvider router={router} history={history} />
    );
};