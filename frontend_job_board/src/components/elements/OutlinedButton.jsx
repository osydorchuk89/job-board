import Button from "@mui/material/Button";

export const OutlinedButton = props => {
    return (
        <Button size="large" sx={{ mr: 5 }} variant="outlined" color="warning">{props.text}</Button>
    );
};