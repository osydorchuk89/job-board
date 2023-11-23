import axios from "axios";
import { BASE_URL } from "../utils/config";
import { Container } from "@mui/joy";
import { VacancyDetailsCard } from "../components/VacancyDetailsCard";

export const VacancyDetails = () => {

    return (
        <Container sx={{ paddingY: 5 }}>
            <VacancyDetailsCard />
        </Container >
    );
};

export const vacancyDataLoader = async ({ request, params }) => {
    try {
        const vacancyId = params.vacancyId;
        const vacancyURL = BASE_URL + `api/vacancies/${vacancyId}`
        const response = await axios.get(vacancyURL);
        return response.data;
    } catch (error) {
        console.error(error);
    };
};