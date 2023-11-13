import { Link as RouterLink } from "react-router-dom"
import { Button, Container } from "@mui/joy";

export const UserProfileEdited = () => {

    return (
        <Container>
            <div>You succesfully edited your profile!</div>
            <Button
                component={RouterLink}
                to="/my-profile"
                variant="solid"
                color="success">
                BACK TO MY PROFILE PAGE
            </Button>
        </Container >
    );
};