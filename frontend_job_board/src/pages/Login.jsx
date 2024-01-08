import { useState, useContext, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Container, Typography, Card, CardContent, CardActions, Stack, Link } from "@mui/joy";
import { AuthContext } from "../store/AuthContext";
import { ProfileContext } from "../store/ProfileContext";
import { LoginForm } from "../components/LoginForm";
import { SnackBarAlert } from "../components/SnackBarAlert";

export const Login = () => {

    const navigate = useNavigate();
    const { authStatus } = useContext(AuthContext);
    const { profile, changeProfile } = useContext(ProfileContext);

    const [registeredAlert, setRegisteredAlert] = useState(false);

    useEffect(() => {
        authStatus.isLoggedIn && navigate("/");
        profile.justRegistered && setRegisteredAlert(true);
    }, []);

    return (
        <Container>
            <Stack
                justifyContent="center"
                alignItems="center"
                spacing={5}
                sx={{ paddingY: { xs: 5, xl: 16 } }}
            >
                <Card variant="outlined" sx={{
                    width: { xs: "80%", sm: "60%", md: "40%" }
                }}>
                    <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
                        <LoginForm />
                    </CardContent>
                    <CardActions>
                    </CardActions>
                </Card>
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
            <Container>
                <SnackBarAlert
                    open={registeredAlert}
                    text="You succesfully registered! Now, please log in to your account."
                    onClose={() => {
                        setRegisteredAlert(false);
                        changeProfile({
                            ...profile,
                            justRegistered: null
                        });
                    }}
                />
            </Container>
        </Container >
    );
};