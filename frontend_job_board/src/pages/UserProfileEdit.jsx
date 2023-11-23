import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/joy";
import { UserProfileForm } from "../components/UserProfileForm";
import { AuthContext } from "../store/AuthContext";

export const UserProfileEdit = () => {

    const { authStatus } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        !authStatus.isLoggedIn && navigate("/login");
    }, []);

    return (
        <Container sx={{ paddingY: 5 }}>
            <Typography level="h3" textAlign="center" sx={{ marginBottom: 5 }}>
                Your Profile
            </Typography>
            <UserProfileForm />
        </Container>
    );
};