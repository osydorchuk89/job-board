import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { useRouteLoaderData } from "react-router-dom";
import { Container } from "@mui/joy";
import { VacancyPostForm } from "../components/VacancyPostForm";
import { BASE_URL } from "../utils/config";

export const VacancyPost = props => {

    const companyData = useRouteLoaderData("root");
    const { isLoggedIn } = useContext(AuthContext);
    console.log(isLoggedIn);

    console.log(companyData);

    const defaultValues = {
        title: "",
        company: "",
        industry: "",
        country: "",
        city: "",
        about_company: "",
        position_overview: "",
        key_responsibilities: "",
        qualifications: "",
        salary: "",
        employment_type: "",
        work_mode: ""
    }

    return (
        <Container maxWidth="md" sx={{ marginY: 5 }}>
            <VacancyPostForm
                companies={companyData}
                defaultValues={defaultValues}
                method="post"
                url={`${BASE_URL}/vacancies/`}
                navigateUrl={"/vacancy-post/posted"}
                buttonText="POST VACANCY"
            />
        </Container>
    );
};