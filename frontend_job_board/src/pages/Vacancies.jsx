import axios from "axios";
import { useRouteLoaderData } from "react-router-dom";
import { Typography, Container } from "@mui/joy";
import { VacanciesList } from "../components/VacanciesList";
import { SearchArea } from "../components/SearchArea";
import { BASE_URL } from "../utils/config";

export const Vacancies = () => {

    const vacancies = useRouteLoaderData("root");

    return (
        <Container>
            <SearchArea paddingY={5} />
            <Typography level="h4" textAlign="center">
                Total {vacancies.length} {vacancies.length === 1 ? "vacancy" : "vacancies"} found
            </Typography>
            <VacanciesList data={vacancies} />
        </Container >

    );
};

export const vacanciesLoader = async query => {
    try {
        let vacanciesURL = BASE_URL + "api/vacancies/?";
        if (query.vacancyTitle) {
            vacanciesURL += `&title=${query.vacancyTitle}`;
        };
        if (query.vacancyCompany) {
            vacanciesURL += `&company=${query.vacancyCompany}`;
        };
        if (query.vacancyCity) {
            vacanciesURL += `&city=${query.vacancyCity}`;
        };
        if (query.vacancyRecruiter) {
            vacanciesURL += `&recruiter=${query.vacancyRecruiter}`;
        };
        if (query.vacancyEmploymentType) {
            vacanciesURL += `&employment_type=${query.vacancyEmploymentType}`;
        };
        const response = await axios({
            method: "get",
            url: vacanciesURL
        });
        return response.data;
    } catch (error) {
        console.error(error);
    };
};