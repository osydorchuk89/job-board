import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container } from "@mui/joy";
import { VacancyApplicationForm } from "../components/VacancyApplicationForm";
import { AuthContext } from "../store/AuthContext";

export const VacancyApplication = () => {

    const navigate = useNavigate();
    const { authStatus } = useContext(AuthContext);
    const { pathname } = useLocation();

    useEffect(() => {
        !authStatus.isLoggedIn && navigate("/login", { state: { previousPath: pathname } });
        authStatus.userType === "Recruiters" && navigate("/change-login-type");
    }, []);

    return (
        <Container maxWidth="md" sx={{ paddingY: 5 }}>
            <VacancyApplicationForm />
        </Container>
    );
};