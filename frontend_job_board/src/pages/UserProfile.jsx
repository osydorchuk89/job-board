import { useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Stack, Typography, List, ListItem, ListItemButton, ListItemContent } from "@mui/joy";
import { useLogout } from "../hooks/useLogout";
import { useBrowseVacancies } from "../hooks/useBrowseVacancies";
import { UserQueryContext } from "../store/UserQueryContext";


export const UserProfile = () => {

    const { changeQuery } = useContext(UserQueryContext);
    let navigate = useNavigate();
    const isCandidate = localStorage.getItem("user_type") === "candidate";

    const handleBrowseVacancies = useBrowseVacancies();
    const handleLogout = useLogout();

    const handleFetchVacancies = event => {
        event.preventDefault();
        const userInputData = {
            vacancyRecruiter: localStorage.getItem("profile_id"),
        };
        changeQuery(userInputData);
        navigate("/vacancies");
    };

    const listItemWidth = { width: { xs: "80%", sm: "55%", md: "35%" } }

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
                <ListItem sx={listItemWidth}>
                    <ListItemButton
                        component={isCandidate ? ListItemButton : RouterLink}
                        to={isCandidate ? null : "/vacancy-post"}
                        onClick={isCandidate ? handleBrowseVacancies : null}
                        color="primary">
                        <ListItemContent sx={{ textAlign: "center", fontSize: "1.3rem" }}>
                            {isCandidate ? "Browse Vacancies" : "Post Vacancy"}
                        </ListItemContent >
                    </ListItemButton>
                </ListItem>
                {!isCandidate && <ListItem sx={listItemWidth}>
                    <ListItemButton
                        color="primary"
                        onClick={handleFetchVacancies}>
                        <ListItemContent sx={{ textAlign: "center", fontSize: "1.3rem" }}>
                            See My Vacancies
                        </ListItemContent >
                    </ListItemButton>
                </ListItem>}
                <ListItem sx={listItemWidth}>
                    <ListItemButton
                        component={RouterLink}
                        to="applications"
                        color="primary">
                        <ListItemContent sx={{ textAlign: "center", fontSize: "1.3rem" }}>
                            {isCandidate ? "See My Applications" : "Review Received Applications"}
                        </ListItemContent >
                    </ListItemButton>
                </ListItem>
                <ListItem sx={listItemWidth}>
                    <ListItemButton
                        component={RouterLink}
                        to="/my-profile/edit"
                        color="primary">
                        <ListItemContent sx={{ textAlign: "center", fontSize: "1.3rem" }}>
                            Edit My Profile
                        </ListItemContent >
                    </ListItemButton>
                </ListItem>
                <ListItem sx={listItemWidth}>
                    <ListItemButton
                        onClick={handleLogout}
                        color="primary">
                        <ListItemContent sx={{ textAlign: "center", fontSize: "1.3rem" }}>
                            Logout
                        </ListItemContent >
                    </ListItemButton>
                </ListItem>
            </List>
        </Stack >
    );
};