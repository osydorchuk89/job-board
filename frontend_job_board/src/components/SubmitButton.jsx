import { Button } from "@mui/joy";

export const SubmitButton = props => {
    return (
        <Button
            type="submit"
            variant="solid"
            color="success"
            size="lg"
            sx={props.sx}>{props.label}</Button>
    )
}