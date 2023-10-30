import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/config";
import { VacanciesList } from "../components/VacanciesList";
import { Typography, Container } from "@mui/joy";

export const Vacancies = props => {

    const [vacancyData, setVacancyData] = useState([]);

    let baseQueryURL = `${BASE_URL}/vacancies/?`;

    if (props.item.vacancyLocation) {
        baseQueryURL += `&city=${props.item.vacancyLocation}`;
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
    }, []);

    console.log(vacancyData);

    return (
        <Container>
            <Typography level="h4" textAlign="center">
                Total {vacancyData.length} vacancies found
            </Typography>
            <VacanciesList companies={props.companies} data={vacancyData} />
        </Container >

    );
};