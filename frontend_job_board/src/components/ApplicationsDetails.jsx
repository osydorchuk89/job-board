import { useContext } from "react";
import { useLoaderData, Link as RouterLink } from "react-router-dom";
import { List, ListItem, Link, Card, Stack } from "@mui/joy";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../store/AuthContext";

export const ApplicationsDetails = () => {

    const applicationData = useLoaderData();
    const { authStatus } = useContext(AuthContext);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return (
        <Stack
            alignItems="center"
            spacing={2}
            sx={{
                paddingY: 5,
            }}>
            {applicationData.map((application, index) =>
                <Card
                    variant="outlined"
                    key={index}
                    sx={{ width: { xs: "90%", sm: "70%", md: "50%" } }}
                >
                    <List sx={{ marginY: 2 }} >
                        <ListItem>
                            <strong>Vacancy Title:</strong>
                            <Link component={RouterLink} to={`/vacancies/${application.vacancy}`}>
                                {application.vacancy_title}
                            </Link>
                        </ListItem>
                        {authStatus.userType === "Candidates" && <ListItem>
                            <strong>Company:</strong> {application.vacancy_company}
                        </ListItem>}
                        {authStatus.userType === "Recruiters" && <ListItem>
                            <strong>Applicant Name:</strong> {application.candidate_name}
                        </ListItem>}
                        {authStatus.userType === "Recruiters" &&
                            <ListItem>
                                <strong>Applicant Email:</strong> <RouterLink
                                    to="#"
                                    onClick={e => {
                                        e.preventDefault();
                                        window.location.href = `mailto:${application.candidate_email}`;
                                    }}>{application.candidate_email}</RouterLink>
                            </ListItem>}
                        {authStatus.userType === "Recruiters" &&
                            <ListItem>
                                <strong>Applicant Phone:</strong> +{application.candidate_phone}
                            </ListItem>}
                        <ListItem>
                            <strong>{authStatus.userType === "Candidates" ? "Submitted" : "Received"} On:</strong> {
                                new Date(application.submission_date).toLocaleDateString("en-us", options)
                            }
                        </ListItem>
                        <ListItem>
                            <Link component={RouterLink} to={`${BASE_URL.slice(0, -1)}${application.cv}`}>
                                <strong>Download CV</strong>
                            </Link>
                        </ListItem>
                    </List>
                </Card>)}
        </Stack>
    );
};