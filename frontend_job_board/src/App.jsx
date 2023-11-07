import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { Error } from "./pages/Error";
import { Root } from "./pages/Root";
import { BASE_URL } from "./utils/config";

export const App = () => {

    const [userQueryData, setUserQueryData] = useState({});
    const [candidates, setCandidates] = useState([]);

    const onClickSearchDisplay = userData => {
        setUserQueryData(userData);
    };

    const fetchCompanies = async () => {
        let getCompaniesURL = BASE_URL + "/companies/?fields=id,name";
        try {
            const response = await axios.get(getCompaniesURL);
            const idCompaniesObject = response.data.reduce(
                (obj, item) => Object.assign(obj, { [item.id]: item.name }), {}
            );
            return idCompaniesObject;
        } catch (error) {
            console.error(error);
        };
    };

    const fetchCandidates = async () => {
        let getCandidatesURL = BASE_URL + "/candidates/?fields=id,name";
        try {
            const response = await axios.get(getCandidatesURL);
            const idCandidatesObject = response.data.reduce(
                (obj, item) => Object.assign(obj, { [item.id]: item.name }), {}
            );
            setCandidates(idCandidatesObject);
        } catch (error) {
            console.error(error);
        };
    }

    useEffect(() => {
        fetchCandidates();
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            errorElement: <Error />,
            id: "root",
            loader: fetchCompanies,
            children: [
                {
                    index: true,
                    element: <Home onClickSearch={onClickSearchDisplay} />,
                },
                {
                    path: "/candidate-login",
                    element: <Login />
                },
                {
                    path: "/recruiter-login",
                    element: <Login />
                },
                {
                    path: "/register",
                    element: <Registration />
                },
                {
                    path: "vacancy-post",
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
                                    element: <VacancyApplication candidates={candidates} />
                                },
                                {
                                    path: "applied",
                                    element: <VacancyApplied />,
                                },
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
    return <RouterProvider router={router} />
};