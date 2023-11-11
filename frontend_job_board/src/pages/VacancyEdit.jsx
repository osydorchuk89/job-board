import { useParams, useRouteLoaderData } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import { VacancyPostForm } from "../components/VacancyPostForm";
import { Container, Typography } from "@mui/joy";

export const VacancyEdit = () => {

    const vacancyData = useRouteLoaderData("vacancy");
    const companyData = useRouteLoaderData("root");

    const params = useParams();
    const vacancyId = params.vacancyId;
    const recruiterId = localStorage.getItem("profile_id");

    const canEdit = vacancyData.recruiter === +recruiterId;

    return (
        <Container>
            {canEdit
                ? <VacancyPostForm
                    companies={companyData}
                    method="put"
                    url={`${BASE_URL}api/vacancies/${vacancyId}/`}
                    navigateUrl={`/vacancies/${vacancyId}/edit/updated`}
                    defaultValues={vacancyData}
                    buttonText="EDIT VACANCY"
                />
                : <Typography>You cannot edit this vacancy.</Typography>}
        </Container>
    );
};