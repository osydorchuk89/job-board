import axios from "axios";
import { useState, useEffect } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { Typography, Container } from "@mui/joy";
import { VacanciesList } from "../components/VacanciesList";
import { SearchArea } from "../components/SearchArea";
import { BASE_URL } from "../utils/config";

export const Vacancies = props => {

    const companyData = useRouteLoaderData("root");

    const [vacancyData, setVacancyData] = useState([]);
    let baseQueryURL = `${BASE_URL}/vacancies/?`;

    const fetchVacancyData = async url => {
        try {
            const response = await axios.get(url);
            setVacancyData(response.data);
        } catch (error) {
            console.error(error);
        };
    };

    if (props.item.vacancyTitle) {
        baseQueryURL += `&title=${props.item.vacancyTitle}`;
    };
    if (props.item.vacancyCompany) {
        baseQueryURL += `&company=${props.item.vacancyCompany}`;
    };
    if (props.item.vacancyCity) {
        baseQueryURL += `&city=${props.item.vacancyCity}`;
    };


    const onClickSearchDisplay = userData => {
        if (userData.vacancyTitle) {
            baseQueryURL += `&title=${userData.vacancyTitle}`;
        };
        if (userData.vacancyCompany) {
            baseQueryURL += `&company=${userData.vacancyCompany}`;
        };
        if (userData.vacancyCity) {
            baseQueryURL += `&city=${userData.vacancyCity}`;
        };
        fetchVacancyData(baseQueryURL);
    };

    useEffect(() => {
        fetchVacancyData(baseQueryURL);
    }, []);

    return (
        <Container>
            <SearchArea onClickSearch={onClickSearchDisplay} />
            <Typography level="h4" textAlign="center">
                Total {vacancyData.length} {vacancyData.length === 1 ? "vacancy" : "vacancies"} found
            </Typography>
            <VacanciesList companies={companyData} data={vacancyData} />
        </Container >

    );
};