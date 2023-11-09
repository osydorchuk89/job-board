import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { useParams, useRouteLoaderData } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import { VacancyPostForm } from "../components/VacancyPostForm";
import { Container } from "@mui/joy";

export const VacancyEdit = () => {

    const { isLoggedIn } = useContext(AuthContext);

    const vacancyData = useRouteLoaderData("vacancy");
    const companyData = useRouteLoaderData("root");

    const params = useParams();
    const vacancyId = params.vacancyId;

    return (
        <Container>
            <VacancyPostForm
                companies={companyData}
                method="put"
                url={`${BASE_URL}/vacancies/${vacancyId}/`}
                navigateUrl={`/vacancies/${vacancyId}/edit/updated`}
                defaultValues={vacancyData}
                buttonText="EDIT VACANCY"
            />
        </Container>
    );
};