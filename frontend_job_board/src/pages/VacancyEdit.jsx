import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouteLoaderData } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import { VacancyPostForm } from "../components/VacancyPostForm";
import { Container } from "@mui/joy";

export const VacancyEdit = props => {

    const vacancyData = useRouteLoaderData("vacancy");
    const companyData = useRouteLoaderData("root");

    // const [vacancyDetails, setVacancyDetails] = useState([]);

    const params = useParams();
    const vacancyId = params.vacancyId;

    // const fetchVacancyDetails = async () => {
    //     let vacancyURL = BASE_URL + `/vacancies/${vacancyId}`
    //     try {
    //         const response = await axios.get(vacancyURL);
    //         setVacancyDetails(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     };
    // };

    // useEffect(() => {
    //     fetchVacancyDetails();
    // }, []);

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