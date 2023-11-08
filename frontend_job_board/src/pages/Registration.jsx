import { Container, Typography, Link } from "@mui/joy";
import { RegistrationForm } from "../components/RegistrationForm";

export const Registration = () => {

    const pathName = window.location.pathname;
    const isCandidateRegistration = pathName === "/candidate-register";

    return (
        <Container sx={{ marginY: 5 }}>
            <RegistrationForm isCandidateRegistration={isCandidateRegistration} />
            <Typography textAlign="center">
                Register as a <Link href={
                    isCandidateRegistration ? "/recruiter-register" : "/candidate-register"
                }>{isCandidateRegistration ? "recruiter" : "candidate"}</Link> instead.
            </Typography>
        </Container>
    );
};