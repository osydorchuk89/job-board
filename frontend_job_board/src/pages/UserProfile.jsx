import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/joy";
import { UserProfileMenu } from "../components/UserProfileMenu";
import { SnackBarContainer } from "../components/SnackBarContainer";
import { AuthContext } from "../store/AuthContext";

export const UserProfile = () => {

    const navigate = useNavigate();
    const { authStatus } = useContext(AuthContext);

    useEffect(() => {
        !authStatus.isLoggedIn && navigate("/login");
    }, []);

    return (
        <Stack direction="column" alignItems="center" spacing={5} sx={{ paddingY: 10 }}>
            <Typography textAlign="center" level="h2">
                Hello, {localStorage.getItem("first_name")} {localStorage.getItem("last_name")}!
            </Typography>
            <UserProfileMenu />
            <SnackBarContainer />
        </Stack >
    );
};