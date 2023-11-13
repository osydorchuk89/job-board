import { Link as RouterLink } from "react-router-dom";
import { Button, Container } from "@mui/joy";

export const LoggedOut = () => {

    return (
        <Container>
            <div>You have logged out!</div>
            <Button
                variant="solid"
                color="success"
                component={RouterLink}
                to="/">
                BACK TO HOME PAGE
            </Button>
        </Container>
    );
};