import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useRouteLoaderData } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import { Box, Button, List, ListItem, Container, Typography, Stack } from "@mui/joy";
import { TopVacancyDetails } from "../components/TopVacancyDetails";
import { EditVacancyButton } from "../components/EditVacancyButton";
import { DeleteVacancyButton } from "../components/DeleteVacancyButton";

export const VacancyDetails = props => {

    const vacancyData = useRouteLoaderData("vacancy");
    const companyData = useRouteLoaderData("root");

    // const [vacancyDetails, setVacancyDetails] = useState({});

    const params = useParams();
    const vacancyId = params.vacancyId;
    // const vacancyURL = BASE_URL + `/vacancies/${vacancyId}`

    // const fetchVacancyDetails = async () => {
    //     try {
    //         const response = await axios.get(vacancyURL);
    //         setVacancyDetails(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     };
    // };

    // useEffect(() => {
    //     fetchVacancyDetails();
    // }, []);

    return (
        <Container sx={{ marginY: 5 }}>
            <Typography level="h2">
                {vacancyData.title}
            </Typography>
            <TopVacancyDetails
                company={companyData[vacancyData.company]}
                industry={vacancyData.industry}
                city={vacancyData.city}
                country={vacancyData.country}
                salary={vacancyData.salary}
                employment_type={vacancyData.employment_type}
                work_mode={vacancyData.work_mode}
            />
            <Box>
                <Typography level="h4">Position Overview</Typography>
                <Typography>{vacancyData.position_overview}</Typography>
            </Box>
            <Box>
                <Typography level="h4">About Company</Typography>
                <Typography>{vacancyData.about_company}</Typography>
            </Box>
            <Box>
                <Typography level="h4">Key Responsibilities</Typography>
                {vacancyData.key_responsibilities &&
                    <List marker="disc">{vacancyData.key_responsibilities.split("\r\n").map(
                        line => <ListItem key={line}>{line}</ListItem>
                    )}</List>}
            </Box>
            <Box>
                <Typography level="h4">Qualifications</Typography>
                {vacancyData.qualifications &&
                    <List marker="disc">{vacancyData.qualifications.split("\r\n").map(
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

export const vacancyDataLoader = async ({ request, params }) => {
    try {
        const vacancyId = params.vacancyId;
        const vacancyURL = BASE_URL + `/vacancies/${vacancyId}`
        const response = await axios.get(vacancyURL);
        return response.data;
    } catch (error) {
        console.error(error);
    };
};