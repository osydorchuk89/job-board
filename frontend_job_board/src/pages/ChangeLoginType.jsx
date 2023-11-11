import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import { Link } from "@mui/joy";
import { Stack, Box, Typography } from "@mui/joy"

export const ChangeLoginType = () => {

    const { changeAuthStatus } = useContext(AuthContext);
    const navigate = useNavigate();
    const isCandidate = localStorage.getItem("user_type") === "candidate";

    const { state } = useLocation();
    let wasRedirected = null;
    if (state && state._isRedirect) {
        wasRedirected = true
    }

    const handleLogout = () => {
        localStorage.clear();
        changeAuthStatus({
            isLoggedIn: false,
            userType: null
        });
        navigate("/");
    }

    return (
        <Stack alignItems="center" sx={{ marginY: 5 }}>
            {wasRedirected
                ? <Box>
                    <Typography>To post a vacancy, you should login as {isCandidate ? "recruiter" : "candidate"} first.</Typography>
                    <Link onClick={handleLogout}>Logout from your {isCandidate ? "candidate" : "recruiter"} account.</Link>
                </Box>
                : <Typography>
                    You shouldn't be here!</Typography>}
        </Stack>
    )
}