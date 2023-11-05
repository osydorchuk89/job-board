import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Container } from "@mui/joy";
import { BASE_URL } from "../utils/config";

export const VacancyApplied = props => {

    const [vacancyData, setVacancyData] = useState({});

    const params = useParams();
    const vacancyId = params.vacancyId;
    let vacancyURL = BASE_URL + `/vacancies/${vacancyId}`

    const fetchVacancyData = async () => {
        try {
            const response = await axios.get(vacancyURL);
            setVacancyData({
                title: response.data.title,
                company: response.data.company
            });
        } catch (error) {
            console.error(error);
        };
    };

    useEffect(() => {
        fetchVacancyData();
    }, [])

    return (
        <Container>
            <div>You succesfully applied for a vacancy {vacancyData.title} at {props.companies[vacancyData.company]}!</div>
            <Button
                variant="solid"
                color="success"
                component="a"
                href="/vacancies/">
                BACK TO ALL VACANCIES
            </Button>
        </Container>
    );
};