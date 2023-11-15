import { useLocation } from "react-router-dom";
import { Container, Link } from "@mui/joy";

export const UserRegistered = () => {

    const { state } = useLocation();

    return (
        <Container>
            <div>You succesfully registered!</div>
            <div>Go to <Link href="/login">login page</Link> </div>
        </Container>
    );
};