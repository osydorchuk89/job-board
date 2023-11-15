import { useContext, useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Link } from "@mui/joy";
import { RegistrationForm } from "../components/RegistrationForm";
import { AuthContext } from "../store/AuthContext";

export const Registration = () => {

    const navigate = useNavigate();
    const { authStatus } = useContext(AuthContext);

    useEffect(() => {
        authStatus.isLoggedIn && navigate("/");
    }, []);

    const location = useLocation()
    const pathName = location.pathname;
    const isCandidateRegistration = pathName === "/candidate-register";

    return (
        <Container sx={{ paddingY: 5 }}>
            <Typography level="h3" textAlign="center" sx={{ marginBottom: 5 }}>
                Register Your {
                    isCandidateRegistration ? "Candidate" : "Recruiter"
                } Account
            </Typography>
            <RegistrationForm isCandidateRegistration={isCandidateRegistration} />
            <Typography textAlign="center" sx={{ marginTop: 3 }}>
                Register as a <Link component={RouterLink} to={
                    isCandidateRegistration ? "/recruiter-register" : "/candidate-register"
                }>{isCandidateRegistration ? "recruiter" : "candidate"}</Link> instead.
            </Typography>
        </Container>
    );
};