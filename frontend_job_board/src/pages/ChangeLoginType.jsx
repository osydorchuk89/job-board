import { useLocation } from "react-router-dom";
import { Link } from "@mui/joy";
import { Stack, Box, Typography } from "@mui/joy";
import { useLogout } from "../hooks/useLogout";

export const ChangeLoginType = () => {

    const isCandidate = localStorage.getItem("user_type") === "candidate";

    const { state } = useLocation();
    let wasRedirected = null;
    if (state && state._isRedirect) {
        wasRedirected = true
    }

    const handleLogout = useLogout();

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