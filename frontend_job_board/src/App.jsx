import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./store/AuthContext";
import { Home } from "./pages/Home";
import { VacancyPost } from "./pages/VacancyPost";
import { Contact } from "./pages/Contact";
import { Vacancies } from "./pages/Vacancies";
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
import { SubmittedApplications, submittedApplicationsLoader } from "./pages/SubmittedApplications";
import { Error } from "./pages/Error";
import { Root } from "./pages/Root";

export const App = () => {

    const [userQueryData, setUserQueryData] = useState({});
    const [userAuthStatus, setUserAuthStatus] = useState({
        isLoggedIn: null,
        userType: null
    });

    const checkTokenExpiry = () => {
        let accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            const { exp } = jwtDecode(accessToken);
            const expirationTime = (exp * 1000) - 10000;
            if (Date.now() >= expirationTime) {
                localStorage.clear();
                setUserAuthStatus({
                    isLoggedIn: false,
                    userType: null
                });
                redirect("/login");
            };
        };
    };

    useEffect(() => {

        if (localStorage.getItem("user_type") === "candidate") {
            setUserAuthStatus({
                isLoggedIn: true,
                userType: "candidate"
            });
        };

        if (localStorage.getItem("user_type") === "recruiter") {
            setUserAuthStatus({
                isLoggedIn: true,
                userType: "recruiter"
            });
        };
    }, [])

    useEffect(() => {
        setInterval(() => {
            checkTokenExpiry();
        }, 4000)
    }, [])

    const setUserAuthStatusFunction = value => {
        console.log(value);
        setUserAuthStatus(value);
    };

    const onClickSearchDisplay = userData => {
        setUserQueryData(userData);
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            errorElement: <Error />,
            id: "root",
            children: [
                {
                    index: true,
                    element: <Home onClickSearch={onClickSearchDisplay} />,
                },
                {
                    path: "login",
                    loader: async () => {
                        if (userAuthStatus.userType) {
                            return redirect("/");
                        };
                        return null;
                    },
                    element: <Login />
                },
                {
                    path: "candidate-register",
                    loader: async () => {
                        if (userAuthStatus.userType) {
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
                        if (userAuthStatus.userType) {
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
                        if (!userAuthStatus.userType) {
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
                            path: "submitted-applications",
                            loader: submittedApplicationsLoader,
                            element: <SubmittedApplications />,
                        },
                        {
                            path: "edit",
                            element: <UserProfileEdit />
                        }
                    ]
                },
                {
                    path: "vacancy-post",
                    loader: async () => {
                        if (userAuthStatus.userType === "recruiter") {
                            return null;
                        };
                        if (userAuthStatus.userType === "candidate") {
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
                    path: "vacancies",
                    children: [
                        {
                            index: true,
                            element: <Vacancies item={userQueryData} />
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
                                        if (userAuthStatus.userType !== "recruiter") {
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
                                        if (userAuthStatus.userType === "candidate") {
                                            return null;
                                        };
                                        if (userAuthStatus.userType === "recruiter") {
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
            ]
        },
    ]);

    const authContextValue = {
        authStatus: userAuthStatus,
        changeAuthStatus: setUserAuthStatusFunction,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            <RouterProvider router={router} history={history} />
        </AuthContext.Provider>
    );
};