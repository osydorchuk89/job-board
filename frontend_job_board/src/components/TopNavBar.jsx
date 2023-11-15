import { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Sheet, Stack, Button, IconButton, Typography, List, ListItem, ListItemButton, ListItemContent } from "@mui/joy";
import WorkIcon from "@mui/icons-material/Work";
import { AuthContext } from "../store/AuthContext";
import { DropdownMenu } from "./DropdownMenu";
import { NavigationLink } from "./NavigationLink";
import { useLogout } from "../hooks/useLogout";
import { useBrowseVacancies } from "../hooks/useBrowseVacancies";
import MenuIcon from '@mui/icons-material/Menu';

export const TopNavBar = () => {

    const { authStatus } = useContext(AuthContext);
    const handleBrowseVacancies = useBrowseVacancies();
    const handleLogout = useLogout();

    const [menuOpen, setMenuOpen] = useState(false);

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
            component: Box,
            text: "Browse Vacancies",
            onClick: handleBrowseVacancies
        },
        {
            link: "/vacancy-post",
            text: "Post New Vacancy"
        },
        authStatus.isLoggedIn
            ? {
                component: Box,
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
        <Box sx={{
            position: "sticky",
            top: 0,
            zIndex: 10
        }}>
            <Sheet
                variant="solid"
                color="primary"
                sx={{ height: 80 }}>
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
                        <WorkIcon sx={{ color: "#FBFCFE", marginRight: 2 }} />
                        <NavigationLink
                            to="/"
                            level="h3"
                            item="JobLink" />
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
                        <IconButton
                            variant="solid"
                            color="primary"
                            onClick={() => setMenuOpen(prevValue => !prevValue)} >
                            <MenuIcon sx={{ height: 40, width: 40 }} />
                        </IconButton>
                    </Box>
                </Stack>
            </Sheet>
            <Sheet
                variant="solid"
                color="primary"
                sx={{
                    display: { xs: menuOpen ? "block" : "none", md: "none" }
                }}>
                <List sx={{
                    width: "100%",
                    "--ListItem-minHeight": "60px"
                }}>
                    {generalMenuItems.map((item, index) =>
                        <ListItem key={index}>
                            <ListItemButton
                                component={item.component ? item.component : RouterLink}
                                to={item.link ? item.link : null}
                                onClick={() => {
                                    setMenuOpen(false);
                                    item.onClick && item.onClick()
                                }}
                                color="primary"
                                variant="solid">
                                <ListItemContent sx={{ textAlign: "center", fontSize: "1.3rem" }}>
                                    {item.text}
                                </ListItemContent >
                            </ListItemButton>
                        </ListItem>)}
                </List>
            </Sheet>
        </Box>
    );
}