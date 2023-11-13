import { Link as RouterLink } from "react-router-dom";
import { Button, Container } from "@mui/joy";

export const VacancyEdited = () => {

    return (
        <Container>
            <div>You succesfully edited a vacancy!</div>
            <Button
                component={RouterLink}
                to="/vacancies"
                variant="solid"
                color="success">
                BACK TO ALL VACANCIES
            </Button>
        </Container>
    );
};