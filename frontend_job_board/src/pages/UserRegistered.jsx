import { useLocation } from "react-router-dom";
import { Container, Link } from "@mui/joy";

export const UserRegistered = () => {

    const { state } = useLocation();
    const loginPath = state.previousPath === "/candidate-register" ? "/candidate-login" : "/recruiter-login"

    return (
        <Container>
            <div>You succesfully registered!</div>
            <div>Go to <Link href={loginPath}>login page</Link> </div>
        </Container>
    );
};