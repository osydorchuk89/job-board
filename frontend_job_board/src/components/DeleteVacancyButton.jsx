import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/joy";
import { BASE_URL } from "../utils/config";

export const DeleteVacancyButton = props => {

    let navigate = useNavigate();

    const handleDeleteVacancy = async vacancyId => {
        let deleteVacancyUrl = BASE_URL + `api/vacancies/${vacancyId}/`
        try {
            const confirmDelete = confirm(`Are you sure you want to delete vacancy #${vacancyId}?`)
            if (confirmDelete) {
                axios.delete(deleteVacancyUrl);
                navigate("/vacancies/deleted");
            }
        } catch (error) { console.log(error) };
    };

    return (
        <Button
            disabled={props.disabled}
            onClick={() => handleDeleteVacancy(props.vacancyId)}
            size={props.size}
            variant="solid"
            color="danger">DELETE</Button>
    );
};