import { Container } from "@mui/joy";
import { VacancyApplicationForm } from "../components/VacancyApplicationForm";

export const VacancyApplication = props => {
    return (
        <Container maxWidth="md" sx={{ marginY: 5 }}>
            <VacancyApplicationForm companies={props.companies} />
        </Container>
    );
};