import { useContext } from "react";
import { useParams, useRouteLoaderData, useLoaderData, Link as RouterLink } from "react-router-dom";
import { Box, Button, Stack, Typography, Card, CardActions, List, ListItem } from "@mui/joy"
import { TopVacancyDetails } from "../components/TopVacancyDetails";
import { EditVacancyButton } from "./EditVacancyButton";
import { DeleteVacancyButton } from "./DeleteVacancyButton";
import { AuthContext } from "../store/AuthContext";

export const VacancyDetailsCard = () => {

    const { authStatus } = useContext(AuthContext);
    const vacancyData = useRouteLoaderData("vacancy");
    const applicationsData = useLoaderData();

    const params = useParams();
    const vacancyId = params.vacancyId;

    const isCandidate = authStatus.userType === "Candidates";
    const isRecruiter = authStatus.userType === "Recruiters";
    const isNotLoggedIn = !authStatus.isLoggedIn

    const candidateApplied = applicationsData.some(obj => obj.vacancy == vacancyId);

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
                    {isCandidate && candidateApplied &&
                        <Button disabled size="lg">YOU HAVE ALREADY APPLIED FOR THIS POSITION</Button>
                    }
                    {((isCandidate && !candidateApplied) || isNotLoggedIn) &&
                        <Button
                            component={RouterLink}
                            to={`/vacancies/${vacancyId}/apply`}
                            size="lg"
                            variant="solid"
                            color="success">APPLY NOW</Button>

                    }
                    {(isCandidate || isNotLoggedIn) && <Button disabled sx={{ visibility: "hidden" }} />}
                    {isRecruiter && <EditVacancyButton
                        disabled={vacancyData.recruiter != localStorage.getItem("profile_id")}
                        vacancyId={vacancyId}
                        size="lg" />}
                    {isRecruiter && <DeleteVacancyButton
                        disabled={vacancyData.recruiter != localStorage.getItem("profile_id")}
                        vacancyId={vacancyId}
                        size="lg" />}
                </CardActions>
            </Card>
        </Stack>
    )
}