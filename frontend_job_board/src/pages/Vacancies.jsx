import axios from "axios";
import { useState, useEffect } from "react";
import { Typography, Container } from "@mui/joy";
import { VacanciesList } from "../components/VacanciesList";
import { SearchArea } from "../components/SearchArea";
import { BASE_URL } from "../utils/config";

export const Vacancies = props => {

    const [vacancyData, setVacancyData] = useState([]);

    let baseQueryURL = `${BASE_URL}/vacancies/?`;

    if (props.item.vacancyCity) {
        baseQueryURL += `&city=${props.item.vacancyCity}`;
    };

    if (props.item.vacancyTitle) {
        baseQueryURL += `&title=${props.item.vacancyTitle}`;
    };

    const fetchVacancyData = async () => {
        try {
            const response = await axios.get(baseQueryURL);
            setVacancyData(response.data);
        } catch (error) {
            console.error(error);
        };
    };

    useEffect(() => async () => {
        fetchVacancyData();
    }, [vacancyData]);

    return (
        <Container>
            <SearchArea />
            <Typography level="h4" textAlign="center">
                Total {vacancyData.length} {vacancyData.length === 1 ? "vacancy" : "vacancies"} found
            </Typography>
            <VacanciesList companies={props.companies} data={vacancyData} />
        </Container >

    );
};