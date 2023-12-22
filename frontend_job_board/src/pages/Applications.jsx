import axios from "axios";
import { useContext, useEffect } from "react";
import { useLoaderData, useNavigate, Link as RouterLink } from "react-router-dom";
import { Container, Typography, Stack, Button } from "@mui/joy";
import { ApplicationsDetails } from "../components/ApplicationsDetails";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../store/AuthContext";

export const Applications = () => {

    const navigate = useNavigate();
    const { authStatus } = useContext(AuthContext);
    const applicationData = useLoaderData();

    useEffect(() => {
        !authStatus.isLoggedIn && navigate("/login");
    }, []);

    return (
        <Container sx={{ paddingY: { xs: 5, xl: 10 } }}>
            <Typography textAlign="center" level="h1">
                {authStatus.userType === "Candidates" ? "My Applications" : "Received Applications"}
            </Typography>
            {applicationData?.length > 0
                ? <ApplicationsDetails />
                : <Stack alignItems="center">
                    <Typography level="body-lg" sx={{ marginY: { xs: 10, lg: 15 } }}>There are no applications.</Typography>
                </Stack>}
            <Stack alignItems="center">
                <Button
                    variant="solid"
                    color="success"
                    size="lg"
                    component={RouterLink}
                    to="/my-profile"
                    sx={{ marginBottom: 10 }}>
                    BACK TO MY PROFILE PAGE
                </Button>
            </Stack>
        </Container>
    );
};

export const applicationsLoader = async () => {
    const isCandidate = localStorage.getItem("user_type") === "Candidates";
    const additionalURL = isCandidate ? "api/candidates/me/" : "api/companies/recruiters/me/"
    if (localStorage.getItem("user_type")) {
        try {
            const applicationURL = BASE_URL + additionalURL
            const response = await axios({
                method: "get",
                url: applicationURL,
                headers: {
                    Authorization: "JWT " + localStorage.getItem("access_token")
                }
            });
            if (localStorage.getItem("user_type") === "Candidates") {
                return response.data.candidate_applications
            } else {
                return response.data.recruiter_applications
            };
        } catch (error) {
            console.log(error);
        };
    } else { return null };

};