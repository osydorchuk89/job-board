import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import { VacancyPostForm } from "../components/VacancyPostForm";
import { Container } from "@mui/joy";

export const VacancyEdit = props => {

    const [vacancyDetails, setVacancyDetails] = useState([]);

    const params = useParams();
    const vacancyId = params.vacancyId;

    const fetchVacancyDetails = async () => {
        let vacancyURL = BASE_URL + `/vacancies/${vacancyId}`
        try {
            const response = await axios.get(vacancyURL);
            setVacancyDetails(response.data);
        } catch (error) {
            console.error(error);
        };
    };

    useEffect(() => {
        fetchVacancyDetails();
    }, []);

    return (
        <Container>
            {vacancyDetails.company && <VacancyPostForm
                companies={props.companies}
                method="put"
                url={`${BASE_URL}/vacancies/${vacancyId}/`}
                navigateUrl={`/vacancies/${vacancyId}/edit/updated`}
                defaultValues={vacancyDetails}
                buttonText="EDIT VACANCY"
            />}
        </Container>
    );
};