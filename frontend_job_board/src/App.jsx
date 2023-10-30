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
import { Root } from "./pages/Root";
import { BASE_URL } from "./utils/config";

export const App = () => {

    const [userQueryValue, setUserQueryValue] = useState({});
    const [companies, setCompanies] = useState([]);

    const onClickSearchDisplay = userQuery => {
        setUserQueryValue(userQuery);
    };

    // const fetchCompanies = async () => {
    //     let getCompaniesURL = BASE_URL + "/companies/?fields=id,name";
    //     try {
    //         const response = await axios.get(getCompaniesURL);
    //         const responseData = response.data;
    //         for (const companyData of responseData) {
    //             companyData["value"] = companyData["id"];
    //             companyData["text"] = companyData["name"];
    //             delete companyData["id"];
    //             delete companyData["name"];
    //         };
    //         setCompanies(responseData);
    //     } catch (error) {
    //         console.error(error);
    //     };
    // };

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

    useEffect(() => {
        fetchCompanies();
    }, []);

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
                    element: <Vacancies item={userQueryValue} companies={companies} />,
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
                    element: <VacancyApplication />,
                },
            ]
        },
    ]);

    return <RouterProvider router={router} />
};