import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Card, CardContent, CardActions, Container, Typography, Link } from "@mui/joy";
import { TopVacancyDetails } from "./TopVacancyDetails";
import { EditVacancyButton } from "./EditVacancyButton";
import { DeleteVacancyButton } from "./DeleteVacancyButton";
import { AuthContext } from "../store/AuthContext";

export const VacanciesList = props => {

    const { authStatus } = useContext(AuthContext);

    return (
        <Container sx={{ paddingY: 5 }}>
            {props.data.map(vacancy => (
                <Card variant="outlined" sx={{ marginY: 5 }} key={vacancy.id}>
                    <CardContent>
                        <Typography level="h3" sx={{ marginBottom: 2 }}>
                            <Link
                                component={RouterLink}
                                to={`/vacancies/${vacancy.id}`}>{vacancy.title}</Link>
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
                        <Typography sx={{
                            marginTop: 2,
                            display: { xs: "none", md: "block" }
                        }}>
                            {vacancy.position_overview}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            component={RouterLink}
                            to={`/vacancies/${vacancy.id}`}
                            size="lg"
                            variant="solid"
                            color="success">LEARN MORE</Button>
                        {authStatus.userType === "recruiter"
                            ? <EditVacancyButton
                                disabled={vacancy.recruiter != localStorage.getItem("profile_id")}
                                vacancyId={vacancy.id}
                                size="lg" />
                            : <Button disabled sx={{ visibility: "hidden" }} />}
                        {authStatus.userType === "recruiter"
                            ? <DeleteVacancyButton
                                disabled={vacancy.recruiter != localStorage.getItem("profile_id")}
                                vacancyId={vacancy.id}
                                size="lg" />
                            : <Button disabled sx={{ visibility: "hidden" }} />}
                    </CardActions>
                </Card>
            ))
            }
        </Container >
    );
};