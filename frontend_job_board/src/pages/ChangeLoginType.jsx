import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/joy";
import { Stack, Box, Typography } from "@mui/joy";
import { useLogout } from "../hooks/useLogout";
import { AuthContext } from "../store/AuthContext";

export const ChangeLoginType = () => {

    const navigate = useNavigate();
    const { authStatus } = useContext(AuthContext);

    useEffect(() => {
        !authStatus.isLoggedIn && navigate("/");
    }, []);

    const handleLogout = useLogout();

    return (
        <Stack alignItems="center" sx={{ paddingY: 5 }}>
            <Box>
                <Typography>
                    {authStatus.userType === "candidate"
                        ? "To post a vacancy, you should login as recruiter."
                        : "To apply for vacancy, you should login as candidate."}
                </Typography>
                <Link onClick={handleLogout}>
                    {authStatus.userType === "candidate"
                        ? "Logout from your candidate account."
                        : "Logout from your recruiter account."}
                </Link>
            </Box>
        </Stack>
    )
}