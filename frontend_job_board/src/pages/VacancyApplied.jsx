import { useRouteLoaderData } from "react-router-dom";
import { Button, Container } from "@mui/joy";

export const VacancyApplied = () => {

    const vacancyData = useRouteLoaderData("vacancy");

    return (
        <Container>
            <div>You succesfully applied for a vacancy {vacancyData.title} at {vacancyData.company}!</div>
            <Button
                variant="solid"
                color="success"
                component="a"
                href="/vacancies/">
                BACK TO ALL VACANCIES
            </Button>
        </Container>
    );
};