import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import { Box, Button, List, ListItem, Container, Typography, Stack } from "@mui/joy";
import { TopVacancyDetails } from "../components/TopVacancyDetails";
import { EditVacancyButton } from "../components/EditVacancyButton";
import { DeleteVacancyButton } from "../components/DeleteVacancyButton";

export const VacancyDetails = props => {

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
            <Typography level="h2">
                {vacancyDetails.title}
            </Typography>
            <TopVacancyDetails
                company={props.companies[vacancyDetails.company]}
                industry={vacancyDetails.industry}
                city={vacancyDetails.city}
                country={vacancyDetails.country}
                salary={vacancyDetails.salary}
                employment_type={vacancyDetails.employment_type}
                work_mode={vacancyDetails.work_mode}
            />
            <Box>
                <Typography level="h4">Position Overview</Typography>
                <Typography>{vacancyDetails.position_overview}</Typography>
            </Box>
            <Box>
                <Typography level="h4">About Company</Typography>
                <Typography>{vacancyDetails.about_company}</Typography>
            </Box>
            <Box>
                <Typography level="h4">Key Responsibilities</Typography>
                {vacancyDetails.key_responsibilities &&
                    <List marker="disc">{vacancyDetails.key_responsibilities.split("\r\n").map(
                        line => <ListItem key={line}>{line}</ListItem>
                    )}</List>}
            </Box>
            <Box>
                <Typography level="h4">Qualifications</Typography>
                {vacancyDetails.qualifications &&
                    <List marker="disc">{vacancyDetails.qualifications.split("\r\n").map(
                        line => <ListItem key={line}>{line}</ListItem>
                    )}</List>}
            </Box>
            <Stack direction="row" spacing={2}>
                <Button
                    component={Link}
                    to={`/vacancies/${vacancyId}/apply`}
                    size="lg"
                    variant="solid"
                    color="success">APPLY NOW</Button>
                <EditVacancyButton
                    vacancyId={vacancyId}
                    size="lg" />
                <DeleteVacancyButton
                    vacancyId={vacancyId}
                    size="lg" />
            </Stack>
        </Container >
    );
};