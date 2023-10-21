import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import { Button, Container, Typography } from "@mui/material";
import { TopVacancyDetails } from "../components/elements/TopVacancyDetails";

export const VacancyDetails = () => {

    const [vacancyDetails, setVacancyDetails] = useState({});

    const params = useParams();
    const vacancyId = params.vacancyId;
    const vacancyURL = BASE_URL + `/vacancies/${vacancyId}`

    const fetchVacancyDetails = async () => {
        try {
            const response = await axios.get(vacancyURL);
            setVacancyDetails(response.data);
        } catch (error) {
            console.error(error);
        };
    };

    useEffect(() => {
        fetchVacancyDetails();
    }, []);

    return (
        <Container sx={{ marginY: 5 }}>
            <Typography variant="h4">
                {vacancyDetails.title}
            </Typography>
            <TopVacancyDetails
                company={vacancyDetails.company}
                industry={vacancyDetails.industry}
                city={vacancyDetails.city}
                country={vacancyDetails.country}
                salary={vacancyDetails.salary}
                employment_type={vacancyDetails.employment_type}
                work_mode={vacancyDetails.work_mode}
            />
            <Typography>
                {vacancyDetails.description}
            </Typography>
            <Button
                component={Link}
                to={`/vacancies/${vacancyId}/apply`}
                size="large"
                variant="contained"
                color="success">APPLY NOW</Button>
        </Container>
    );
};