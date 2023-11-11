import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/joy";

export const EditVacancyButton = props => {
    return (
        <Button
            disabled={props.disabled}
            component={RouterLink}
            to={`/vacancies/${props.vacancyId}/edit`}
            size={props.size}
            variant="solid"
            color="warning">EDIT</Button>
    );
};