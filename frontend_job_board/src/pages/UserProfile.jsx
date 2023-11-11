import { Link as RouterLink } from "react-router-dom";
import { Stack, Typography, List, ListItem, ListItemButton, ListItemContent } from "@mui/joy";

export const UserProfile = () => {

    const isCandidate = localStorage.getItem("user_type") === "candidate";

    return (
        <Stack direction="column" alignItems="center" spacing={2} sx={{ marginY: 5 }}>
            <Typography textAlign="center" level="h2">
                Hello, {localStorage.getItem("first_name")} {localStorage.getItem("last_name")}!
            </Typography>
            <List sx={{
                width: "100%",
                alignItems: "center",
                "--List-gap": "5px",
                "--ListItem-minHeight": "75px"
            }}>
                <ListItem sx={{ width: "50%" }}>
                    <ListItemButton
                        component={RouterLink}
                        to={isCandidate ? "/vacancies" : "/vacancy-post"}
                        color="primary">
                        <ListItemContent sx={{ textAlign: "center", fontSize: "1.3rem" }}>
                            {isCandidate ? "Browse Vacancies" : "Post Vacancy"}
                        </ListItemContent >
                    </ListItemButton>
                </ListItem>
                <ListItem sx={{ width: "50%" }}>
                    <ListItemButton
                        component={RouterLink}
                        to={isCandidate ? "/my-profile/submitted-applications" : "/my-profile/received-applications"}
                        color="primary">
                        <ListItemContent sx={{ textAlign: "center", fontSize: "1.3rem" }}>
                            {isCandidate ? "See My Applications" : "Review Received Applications"}
                        </ListItemContent >
                    </ListItemButton>
                </ListItem>
                <ListItem sx={{ width: "50%" }}>
                    <ListItemButton component={RouterLink} to="/my-profile/edit" color="primary">
                        <ListItemContent sx={{ textAlign: "center", fontSize: "1.3rem" }}>
                            Edit My Profile
                        </ListItemContent >
                    </ListItemButton>
                </ListItem>
            </List>
        </Stack >
    );
};