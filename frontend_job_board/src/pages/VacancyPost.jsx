import { useContext, useEffect } from "react";
import { useRouteLoaderData, useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/joy";
import { VacancyPostForm } from "../components/VacancyPostForm";
import { AuthContext } from "../store/AuthContext";
import { BASE_URL } from "../utils/config";

export const VacancyPost = () => {

    const navigate = useNavigate();
    const { authStatus } = useContext(AuthContext);

    useEffect(() => {
        !authStatus.isLoggedIn && navigate("/login");
        authStatus.userType === "candidate" && navigate("/");
    }, []);

    const companyData = useRouteLoaderData("root");

    const defaultValues = {
        title: "",
        company: "",
        industry: "",
        country: "",
        city: "",
        about_company: "",
        position_overview: "",
        responsibilities: "",
        qualifications: "",
        salary: "",
        employment_type: "",
        work_mode: ""
    };

    return (
        <Container sx={{ paddingY: 5 }}>
            <Typography
                textAlign="center"
                level="h3"
                sx={{ marginBottom: 5 }}>Post New Vacancy</Typography>
            <VacancyPostForm
                companies={companyData}
                defaultValues={defaultValues}
                method="post"
                action="justPostedVacancy"
                url={`${BASE_URL}api/vacancies/`}
                // navigateUrl={"/vacancy-post/posted"}
                buttonText="POST VACANCY"
            />
        </Container>
    );
};