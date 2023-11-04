import { Button, Container } from "@mui/joy";

export const VacancyEdited = () => {
    return (
        <Container>
            <div>You succesfully edited a vacancy!</div>
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