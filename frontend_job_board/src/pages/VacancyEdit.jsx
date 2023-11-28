import { useContext, useEffect } from "react";
import { useParams, useRouteLoaderData, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import { VacancyPostForm } from "../components/VacancyPostForm";
import { Container, Typography } from "@mui/joy";
import { AuthContext } from "../store/AuthContext";

export const VacancyEdit = () => {

    const navigate = useNavigate();
    const { authStatus } = useContext(AuthContext);

    useEffect(() => {
        authStatus.userType !== "Recruiters" && navigate("/");
    }, []);

    const vacancyData = useRouteLoaderData("vacancy");
    const companyData = useRouteLoaderData("root");

    const params = useParams();
    const vacancyId = params.vacancyId;
    const recruiterId = localStorage.getItem("profile_id");

    const canEdit = vacancyData.recruiter === +recruiterId;

    return (
        <Container sx={{ paddingY: 5 }}>
            {canEdit
                ? (<>
                    <Typography
                        textAlign="center"
                        level="h3"
                        sx={{ marginBottom: 5 }}>Edit Vacancy</Typography>
                    <VacancyPostForm
                        companies={companyData}
                        method="put"
                        action="justEditedVacancy"
                        url={`${BASE_URL}api/vacancies/${vacancyId}/`}
                        defaultValues={vacancyData}
                        buttonText="EDIT VACANCY"
                    />
                </>)
                : <Typography>You cannot edit this vacancy.</Typography>}
        </Container>
    );
};