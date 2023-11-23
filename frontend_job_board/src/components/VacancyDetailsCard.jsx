import { useContext } from "react";
import { useParams, useRouteLoaderData, Link as RouterLink } from "react-router-dom";
import { Box, Button, Stack, Typography, Card, CardActions, List, ListItem } from "@mui/joy"
import { TopVacancyDetails } from "../components/TopVacancyDetails";
import { EditVacancyButton } from "./EditVacancyButton";
import { DeleteVacancyButton } from "./DeleteVacancyButton";
import { AuthContext } from "../store/AuthContext";

export const VacancyDetailsCard = () => {

    const { authStatus } = useContext(AuthContext);
    const vacancyData = useRouteLoaderData("vacancy");

    const params = useParams();
    const vacancyId = params.vacancyId;

    return (
        <Stack>
            <Card variant="outlined" sx={{ marginBottom: 5 }}>
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
                    {vacancyData.responsibilities &&
                        <List marker="disc">{vacancyData.responsibilities.split("\r\n").map(
                            (line, index) => <ListItem key={index}>
                                <Typography>
                                    {line}
                                </Typography>
                            </ListItem>
                        )}</List>}
                </Box>
                <Box>
                    <Typography level="h4">Qualifications</Typography>
                    {vacancyData.qualifications &&
                        <List marker="disc">{vacancyData.qualifications.split("\r\n").map(
                            (line, index) => <ListItem key={index}>
                                <Typography>
                                    {line}
                                </Typography>
                            </ListItem>
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
                            display: authStatus.userType === "recruiter" ? "none" : "block"
                        }}>APPLY NOW</Button>
                    {authStatus.userType === "candidate" && <Button disabled sx={{ visibility: "hidden" }} />}
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
        </Stack>
    )
}