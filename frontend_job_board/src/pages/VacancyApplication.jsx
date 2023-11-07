import { useRouteLoaderData } from "react-router-dom";
import { Container } from "@mui/joy";
import { VacancyApplicationForm } from "../components/VacancyApplicationForm";

export const VacancyApplication = props => {

    const vacancyData = useRouteLoaderData("vacancy");
    const companyData = useRouteLoaderData("root");

    return (
        <Container maxWidth="md" sx={{ marginY: 5 }}>
            <VacancyApplicationForm
                companies={companyData}
                candidates={props.candidates}
                vacancyData={vacancyData} />
        </Container>
    );
};