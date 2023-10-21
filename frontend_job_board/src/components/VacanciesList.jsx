import { Link } from "react-router-dom";
import { Button, Card, CardContent, CardActions, Container, Typography, Stack, Chip } from "@mui/material";
import { TopVacancyDetails } from "./elements/TopVacancyDetails";

export const VacanciesList = props => {

    return (
        <Container>
            {props.data.map(vacancy => (
                <Card variant="outlined" sx={{ marginY: 5 }} key={vacancy.id}>
                    <CardContent>
                        <Typography variant="h5">
                            {vacancy.title}
                        </Typography>
                        <TopVacancyDetails
                            company={vacancy.company}
                            industry={vacancy.industry}
                            city={vacancy.city}
                            country={vacancy.country}
                            salary={vacancy.salary.toLocaleString('en-US')}
                            employment_type={vacancy.employment_type}
                            work_mode={vacancy.work_mode}
                        />
                        <Typography sx={{ mt: 2 }}>
                            {vacancy.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            component={Link}
                            to={`${vacancy.id}`}
                            size="medium"
                            variant="contained"
                            color="success">Learn More</Button>
                    </CardActions>
                </Card>
            ))}
        </Container>
    )
}