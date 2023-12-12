import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/joy";
import { BASE_URL } from "../utils/config";
import { ProfileContext } from "../store/ProfileContext";

export const DeleteVacancyButton = props => {

    const { profile, changeProfile } = useContext(ProfileContext);

    let navigate = useNavigate();

    const handleDeleteVacancy = async vacancyId => {
        let deleteVacancyUrl = BASE_URL + `api/vacancies/${vacancyId}/`
        const confirmDelete = confirm(`Are you sure you want to delete vacancy #${vacancyId}?`)
        if (confirmDelete) {
            try {
                axios({
                    method: "delete",
                    url: deleteVacancyUrl,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: "JWT " + localStorage.getItem("access_token")
                    }
                });
                changeProfile({
                    ...profile,
                    justDeletedVacancy: true
                })
                navigate("/vacancies");
            } catch (error) { console.log(error) }
        };
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