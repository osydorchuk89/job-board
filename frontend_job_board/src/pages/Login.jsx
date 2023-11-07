import { useLocation } from "react-router-dom";
import { Container, Typography, Card, CardContent, CardActions, Stack, Link } from "@mui/joy";
import { LoginForm } from "../components/LoginForm";

export const Login = () => {

    const pathName = window.location.pathname;
    const isCandidateLogin = pathName === "/candidate-login";

    return (
        <Container sx={{ marginY: 5 }}>
            <Stack justifyContent="center" alignItems="center" spacing={5}>
                <Card variant="outlined" sx={{ width: "66%" }}>
                    <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
                        <LoginForm />
                    </CardContent>
                    <CardActions>
                    </CardActions>
                </Card>
                <Typography textAlign="center">
                    Login as a {
                        isCandidateLogin ? "recruiter" : "candidate"
                    } <Link underline="none" href={
                        isCandidateLogin ? "/recruiter-login" : "/candidate-login"
                    }>here</Link>.
                </Typography>
                <Typography textAlign="center">
                    Don't have an account yet? Register <Link underline="none" href="/register">here</Link>.
                </Typography>
            </Stack>
        </Container >

    );
};