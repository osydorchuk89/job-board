import { Link } from "react-router-dom";
import { Button, Card, CardContent, CardActions, Container, Typography } from "@mui/joy";
import { TopVacancyDetails } from "./TopVacancyDetails";

export const VacanciesList = props => {

    return (
        <Container>
            {props.data.map(vacancy => (
                <Card variant="outlined" sx={{ marginY: 5 }} key={vacancy.id}>
                    <CardContent>
                        <Typography level="h4">
                            {vacancy.title}
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
                            color="success">Learn More</Button>
                        <Button
                            component="a"
                            href={`/vacancies/${vacancy.id}/edit`}
                            size="md"
                            variant="solid"
                            color="warning">Edit</Button>
                        <Button
                            component="a"
                            href={`/vacancies/${vacancy.id}/delete`}
                            size="md"
                            variant="solid"
                            color="danger">Delete</Button>
                    </CardActions>
                </Card>
            ))}
        </Container>
    )
}