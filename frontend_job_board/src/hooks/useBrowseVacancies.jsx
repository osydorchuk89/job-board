import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserQueryContext } from "../store/UserQueryContext";

export const useBrowseVacancies = () => {

    const { changeQuery } = useContext(UserQueryContext);
    const navigate = useNavigate();

    const handleBrowsevacancies = () => {
        changeQuery({
            vacancyTitle: null,
            vacancyCompany: null,
            vacancyCity: null
        });
        navigate("/vacancies");
    };

    return handleBrowsevacancies;
};