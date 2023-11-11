import { useContext } from "react";
import { Button, Card, CardContent, CardActions, Container, Typography, Link } from "@mui/joy";
import { TopVacancyDetails } from "./TopVacancyDetails";
import { EditVacancyButton } from "./EditVacancyButton";
import { DeleteVacancyButton } from "./DeleteVacancyButton";
import { AuthContext } from "../store/AuthContext";

export const VacanciesList = props => {

    const { authStatus } = useContext(AuthContext);

    return (
        <Container>
            {props.data.map(vacancy => (
                <Card variant="outlined" sx={{ marginY: 5 }} key={vacancy.id}>
                    <CardContent>
                        <Typography level="h3" sx={{ marginBottom: 2 }}>
                            <Link underline="none" variant="plain" href={`/vacancies/${vacancy.id}`}>{vacancy.title}</Link>
                        </Typography>
                        <TopVacancyDetails
                            company={vacancy.company}
                            industry={vacancy.industry}
                            city={vacancy.city}
                            country={vacancy.country}
                            salary={vacancy.salary}
                            employment_type={vacancy.employment_type}
                            work_mode={vacancy.work_mode}
                        />
                        <Typography sx={{ mt: 2 }}>
                            {vacancy.position_overview}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            component="a"
                            href={`/vacancies/${vacancy.id}`}
                            size="md"
                            variant="solid"
                            color="success">LEARN MORE</Button>
                        {authStatus.userType === "recruiter" &&
                            <EditVacancyButton
                                disabled={vacancy.recruiter != localStorage.getItem("profile_id")}
                                vacancyId={vacancy.id}
                                size="md" />}
                        {authStatus.userType === "recruiter" &&
                            <DeleteVacancyButton
                                disabled={vacancy.recruiter != localStorage.getItem("profile_id")}
                                vacancyId={vacancy.id}
                                size="md" />}
                    </CardActions>
                </Card>
            ))
            }
        </Container >
    )
}