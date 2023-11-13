import axios from "axios";
import { useContext } from "react";
import { useParams, Link as RouterLink, useRouteLoaderData } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import { Box, Button, List, ListItem, Container, Typography, Card, CardActions } from "@mui/joy";
import { TopVacancyDetails } from "../components/TopVacancyDetails";
import { EditVacancyButton } from "../components/EditVacancyButton";
import { DeleteVacancyButton } from "../components/DeleteVacancyButton";
import { AuthContext } from "../store/AuthContext";

export const VacancyDetails = () => {

    const { authStatus } = useContext(AuthContext);
    const vacancyData = useRouteLoaderData("vacancy");
    const isRecruiter = localStorage.getItem("user_type") === "recruiter";

    const params = useParams();
    const vacancyId = params.vacancyId;

    return (
        <Container sx={{ marginY: 5 }}>
            <Card variant="outlined" sx={{ marginY: 5 }}>
                <Typography
                    textAlign="center"
                    level="h2"
                    sx={{ marginBottom: 2 }}>
                    {vacancyData.title}
                </Typography>
                <TopVacancyDetails
                    company={vacancyData.company}
                    industry={vacancyData.industry}
                    city={vacancyData.city}
                    country={vacancyData.country}
                    salary={vacancyData.salary}
                    employment_type={vacancyData.employment_type}
                    work_mode={vacancyData.work_mode}
                />
            </Card>
            <Card>
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
                            (line, index) => <ListItem key={index}>{line}</ListItem>
                        )}</List>}
                </Box>
                <Box>
                    <Typography level="h4">Qualifications</Typography>
                    {vacancyData.qualifications &&
                        <List marker="disc">{vacancyData.qualifications.split("\r\n").map(
                            (line, index) => <ListItem key={index}>{line}</ListItem>
                        )}</List>}
                </Box>
                <CardActions>
                    <Button
                        component={RouterLink}
                        to={`/vacancies/${vacancyId}/apply`}
                        size="lg"
                        variant="solid"
                        color="success"
                        sx={{
                            display: isRecruiter ? "none" : "block"
                        }}>APPLY NOW</Button>
                    {!isRecruiter && <Button disabled sx={{ visibility: "hidden" }} />}
                    {authStatus.userType === "recruiter" &&
                        <EditVacancyButton
                            disabled={vacancyData.recruiter != localStorage.getItem("profile_id")}
                            vacancyId={vacancyId}
                            size="lg" />}
                    {authStatus.userType === "recruiter" &&
                        <DeleteVacancyButton
                            disabled={vacancyData.recruiter != localStorage.getItem("profile_id")}
                            vacancyId={vacancyId}
                            size="lg" />}
                </CardActions>
            </Card>
        </Container >
    );
};

export const vacancyDataLoader = async ({ request, params }) => {
    try {
        const vacancyId = params.vacancyId;
        const vacancyURL = BASE_URL + `api/vacancies/${vacancyId}`
        const response = await axios.get(vacancyURL);
        return response.data;
    } catch (error) {
        console.error(error);
    };
};