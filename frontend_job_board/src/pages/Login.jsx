import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Card, CardContent, CardActions, Stack, Link } from "@mui/joy";
import { LoginForm } from "../components/LoginForm";

export const Login = props => {

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
                    Don't have an account yet?
                </Typography>
                <Typography>
                    <Link component={RouterLink} to="/candidate-register">
                        Register as a candidate here
                    </Link>
                </Typography>
                <Typography>
                    <Link component={RouterLink} to="/recruiter-register">
                        Register as a recruiter here
                    </Link>
                </Typography>
            </Stack>
        </Container >
    );
};