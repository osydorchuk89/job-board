import { Button } from "@mui/joy";

export const EditVacancyButton = props => {
    return (
        <Button
            component="a"
            href={`/vacancies/${props.vacancyId}/edit`}
            size={props.size}
            variant="solid"
            color="warning">EDIT</Button>
    );
};