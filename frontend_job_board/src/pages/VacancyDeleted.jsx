import { Link as RouterLink } from "react-router-dom";
import { Button, Container } from "@mui/joy";

export const VacancyDeleted = () => {
    return (
        <Container>
            <div>You succesfully deleted a vacancy!</div>
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