import { Link as RouterLink } from "react-router-dom";
import { useContext } from "react";
import { Box, Sheet, Stack, Button, Link, IconButton, Typography } from "@mui/joy";
import WorkIcon from "@mui/icons-material/Work";
import { AuthContext } from "../store/AuthContext";
import { DropdownMenu } from "./DropdownMenu";
import { useLogout } from "../hooks/useLogout";
import { useBrowseVacancies } from "../hooks/useBrowseVacancies";

export const TopNavBar = () => {

    const { authStatus } = useContext(AuthContext);
    const handleBrowseVacancies = useBrowseVacancies();
    const handleLogout = useLogout();

    const registerMenuItems = [
        {
            link: "/candidate-register",
            text: "Register As Candidate"
        },
        {
            link: "/recruiter-register",
            text: "Register As Recruiter"
        },
    ];

    let generalMenuItems = [
        {
            link: "/vacancies",
            text: "Browse Vacancies"
        },
        {
            link: "/vacancy-post",
            text: "Post New Vacancy"
        },
        authStatus.isLoggedIn
            ? {
                component: Typography,
                text: "Logout",
                onClick: handleLogout
            }
            : {
                link: "/login",
                text: "Login"
            },
        authStatus.isLoggedIn
            ? {
                link: "/my-profile",
                text: "My Profile",
            }
            : {
                link: "/candidate-register",
                text: "Register As Candidate"
            },
    ]


    if (!authStatus.isLoggedIn) {
        generalMenuItems = [
            ...generalMenuItems,
            {
                link: "/recruiter-register",
                text: "Register As Recruiter",
            }
        ];
    };

    generalMenuItems = [
        ...generalMenuItems,
        {
            link: "/about-us",
            text: "About Us",
        },
        {
            link: "/contact",
            text: "Contacts",
        }
    ];


    return (
        <Sheet variant="solid" color="primary" sx={{
            bgcolor: "primary.main",
            width: "100%",
            height: 80,
            position: "sticky",
            top: 0,
            zIndex: 10
        }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ height: "100%", mx: { xs: 1, md: 5 } }}
            >
                <Box
                    sx={{
                        width: { xs: "50%", md: "25%", lg: "35%" },
                        color: "#f5f5f5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: { xs: "center", md: "flex-start" }
                    }}>
                    <WorkIcon sx={{ color: "#f5f5f5", marginRight: 2 }} />
                    <Link
                        sx={{ color: "#f5f5f5" }}
                        component={RouterLink}
                        size="lg"
                        underline="none"
                        to="/"
                        level="h3"
                    >JobLink</Link>
                </Box>
                <Button
                    size="lg"
                    color="success"
                    variant="solid"
                    onClick={handleBrowseVacancies}
                    sx={{
                        width: { xs: "25%", md: "20%", lg: "15%" },
                        display: { xs: "none", md: "block" }
                    }}>BROWSE VACANCIES</Button>
                <Button
                    component={RouterLink}
                    size="lg"
                    to="/vacancy-post"
                    color="success"
                    variant="solid"
                    sx={{
                        width: { xs: "25%", md: "20%", lg: "15%" },
                        display: { xs: "none", md: "block" },
                        textAlign: "center",
                        marginRight: { xs: 0, md: 4, lg: 8 },
                        marginLeft: 2,
                    }}>POST NEW VACANCY</Button>
                <Button
                    component={authStatus.isLoggedIn ? Button : RouterLink}
                    to={authStatus.isLoggedIn ? null : "/login"}
                    size="lg"
                    variant="solid"
                    color="warning"
                    onClick={authStatus.isLoggedIn ? handleLogout : null}
                    sx={{ marginRight: 2, display: { xs: "none", md: "block" } }}>
                    {authStatus.isLoggedIn ? "LOGOUT" : "LOGIN"}
                </Button>
                {authStatus.isLoggedIn && <Button
                    component={RouterLink}
                    to={"/my-profile"}
                    size="lg"
                    variant="solid"
                    color="warning"
                    sx={{ display: { xs: "none", md: "block" } }}>
                    MY PROFILE
                </Button>}
                {!authStatus.isLoggedIn && <DropdownMenu
                    sx={{ display: { xs: "none", md: "block" } }}
                    label="REGISTER"
                    variant="solid"
                    color="warning"
                    size="lg"
                    menuItems={registerMenuItems} />}
                <Box sx={{
                    width: "50%",
                    display: { xs: "flex", md: "none" },
                    justifyContent: "center"
                }}>
                    <DropdownMenu
                        size="lg"
                        color="primary"
                        iconButton={true}
                        slots={{ root: IconButton }}
                        slotProps={{ root: { variant: "solid", color: "primary" } }}
                        menuItems={generalMenuItems} />
                </Box>
            </Stack>
        </Sheet>
    );
}