import { useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { List, ListItem, ListItemButton, ListItemContent } from "@mui/joy";
import { useLogout } from "../hooks/useLogout";
import { useBrowseVacancies } from "../hooks/useBrowseVacancies";
import { UserQueryContext } from "../store/UserQueryContext";
import { AuthContext } from "../store/AuthContext";

export const UserProfileMenu = () => {

    const { changeQuery } = useContext(UserQueryContext);
    const { authStatus } = useContext(AuthContext);

    let navigate = useNavigate();
    const isCandidate = authStatus.userType === "Candidates";

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
        <List sx={{
            width: "100%",
            alignItems: "center",
            "--List-gap": "30px",
            "--ListItem-minHeight": "60px"
        }}>
            <ListItem sx={listItemWidth}>
                <ListItemButton
                    component={RouterLink}
                    to={isCandidate ? null : "/vacancy-post"}
                    onClick={isCandidate ? handleBrowseVacancies : null}
                    color="primary"
                    variant="solid">
                    <ListItemContent sx={{ textAlign: "center", fontSize: "1.3rem" }}>
                        {isCandidate ? "Browse Vacancies" : "Post Vacancy"}
                    </ListItemContent >
                </ListItemButton>
            </ListItem>
            {!isCandidate && <ListItem sx={listItemWidth}>
                <ListItemButton
                    color="primary"
                    variant="solid"
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
                    color="primary"
                    variant="solid">
                    <ListItemContent sx={{ textAlign: "center", fontSize: "1.3rem" }}>
                        {isCandidate ? "See My Applications" : "Review Received Applications"}
                    </ListItemContent >
                </ListItemButton>
            </ListItem>
            <ListItem sx={listItemWidth}>
                <ListItemButton
                    component={RouterLink}
                    to="/my-profile/edit"
                    color="primary"
                    variant="solid">
                    <ListItemContent sx={{ textAlign: "center", fontSize: "1.3rem" }}>
                        Edit My Profile
                    </ListItemContent >
                </ListItemButton>
            </ListItem>
            <ListItem sx={listItemWidth}>
                <ListItemButton
                    onClick={handleLogout}
                    color="primary"
                    variant="solid">
                    <ListItemContent sx={{ textAlign: "center", fontSize: "1.3rem" }}>
                        Logout
                    </ListItemContent >
                </ListItemButton>
            </ListItem>
        </List>
    );
};