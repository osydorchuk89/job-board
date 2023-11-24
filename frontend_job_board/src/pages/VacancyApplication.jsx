import { useContext, useEffect } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import { Container } from "@mui/joy";
import { VacancyApplicationForm } from "../components/VacancyApplicationForm";
import { AuthContext } from "../store/AuthContext";

export const VacancyApplication = () => {

    const params = useParams();
    const vacancyId = params.vacancyId;

    const navigate = useNavigate();
    const { authStatus } = useContext(AuthContext);
    const applicationsData = useLoaderData();

    useEffect(() => {
        !authStatus.isLoggedIn && navigate("/login");
        applicationsData.some(obj => obj.vacancy == vacancyId) && navigate("/");
        authStatus.userType === "Recruiters" && navigate("/");
    }, []);

    return (
        <Container maxWidth="md" sx={{ paddingY: 5 }}>
            <VacancyApplicationForm />
        </Container>
    );
};