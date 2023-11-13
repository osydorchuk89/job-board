import { useLoaderData, Link as RouterLink } from "react-router-dom";
import { List, ListItem, Link, Card, Container } from "@mui/joy";
import { BASE_URL } from "../utils/config";

export const ApplicationsDetails = () => {

    const applicationData = useLoaderData();
    const isCandidate = localStorage.getItem("user_type") === "candidate";

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return (
        <Container>
            {applicationData.map((application, index) =>
                <Card variant="outlined" sx={{ marginY: 5 }} key={index}>
                    <List sx={{ marginY: 2 }} >
                        <ListItem>
                            <strong>Vacancy Title:</strong> {application.vacancy_title}
                        </ListItem>
                        {isCandidate && <ListItem>
                            <strong>Company:</strong> {application.vacancy_company}
                        </ListItem>}
                        {!isCandidate && <ListItem>
                            <strong>Applicant Name:</strong> {application.candidate_name}
                        </ListItem>}
                        {!isCandidate &&
                            <ListItem>
                                <strong>Applicant Email:</strong> <RouterLink
                                    to="#"
                                    onClick={e => {
                                        e.preventDefault();
                                        window.location.href = `mailto:${application.candidate_email}`;
                                    }}>{application.candidate_email}</RouterLink>
                            </ListItem>}
                        {!isCandidate &&
                            <ListItem>
                                <strong>Applicant Phone:</strong> +{application.candidate_phone}
                            </ListItem>}
                        <ListItem>
                            <strong>{isCandidate ? "Submitted" : "Received"} On:</strong> {
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
        </Container>
    );
};