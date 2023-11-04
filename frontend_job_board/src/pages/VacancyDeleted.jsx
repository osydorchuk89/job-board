import { Button, Container } from "@mui/joy";

export const VacancyDeleted = () => {
    return (
        <Container>
            <div>You succesfully deleted a vacancy!</div>
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