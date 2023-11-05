import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import { Home } from "./pages/Home";
import { VacancyPost } from "./pages/VacancyPost";
import { Contact } from "./pages/Contact";
import { Vacancies } from "./pages/Vacancies";
import { VacancyDetails } from "./pages/VacancyDetails";
import { VacancyApplication } from "./pages/VacancyApplication";
import { VacancyPosted } from "./pages/VacancyPosted";
import { VacancyEdit } from "./pages/VacancyEdit";
import { VacancyEdited } from "./pages/VacancyEdited";
import { VacancyDeleted } from "./pages/VacancyDeleted";
import { VacancyApplied } from "./pages/VacancyApplied";
import { Error } from "./pages/Error";
import { Root } from "./pages/Root";
import { BASE_URL } from "./utils/config";

export const App = () => {

    const [userQueryData, setUserQueryData] = useState({});
    const [companies, setCompanies] = useState([]);
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
            setCompanies(idCompaniesObject);
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
        fetchCompanies();
        fetchCandidates();
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            errorElement: <Error />,
            children: [
                {
                    index: true,
                    element: <Home onClickSearch={onClickSearchDisplay} />,
                },
                {
                    path: "/vacancy-post",
                    element: <VacancyPost companies={companies} />,
                },
                {
                    path: "/vacancy-post/posted",
                    element: <VacancyPosted />
                },
                {
                    path: "/contact",
                    element: <Contact />,
                },
                {
                    path: "/vacancies",
                    element: <Vacancies item={userQueryData} companies={companies} />,
                    loader: async url => {
                        try {
                            const response = await axios.get(`${BASE_URL}/vacancies/?`);
                            return response.data;
                        } catch (error) {
                            console.error(error);
                        };
                    }
                },
                {
                    path: "/vacancies/:vacancyId",
                    element: <VacancyDetails companies={companies} />,
                },
                {
                    path: "/vacancies/:vacancyId/edit",
                    element: <VacancyEdit companies={companies} />,
                },
                {
                    path: "/vacancies/deleted",
                    element: <VacancyDeleted />,
                },
                {
                    path: "/vacancies/:vacancyId/edit/updated",
                    element: <VacancyEdited />,
                },
                {
                    path: "/vacancies/:vacancyId/apply",
                    element: <VacancyApplication companies={companies} candidates={candidates} />,
                },
                {
                    path: "/vacancies/:vacancyId/applied",
                    element: <VacancyApplied companies={companies} />,
                },
            ]
        },
    ]);

    return <RouterProvider router={router} />
};