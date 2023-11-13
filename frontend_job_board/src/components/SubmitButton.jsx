import { Button } from "@mui/joy";

export const SubmitButton = props => {
    return (
        <Button
            type="submit"
            variant="solid"
            color="success"
            size="lg"
            sx={{
                width: { xs: "50%", sm: "40%", md: "30%" },
                marginTop: 5,
                alignSelf: "center"
            }}>{props.label}</Button>
    )
}