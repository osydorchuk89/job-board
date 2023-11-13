import { useRouteLoaderData, Link as RouterLink } from "react-router-dom";
import { Button, Container } from "@mui/joy";

export const VacancyApplied = () => {

    const vacancyData = useRouteLoaderData("vacancy");

    return (
        <Container>
            <div>You succesfully applied for a vacancy {vacancyData.title} at {vacancyData.company}!</div>
            <Button
                variant="solid"
                color="success"
                component={RouterLink}
                to="/vacancies">
                BACK TO ALL VACANCIES
            </Button>
        </Container>
    );
};