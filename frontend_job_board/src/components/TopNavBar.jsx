import AppBar from "@mui/material/AppBar";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Box, Toolbar, IconButton } from "@mui/material";
import { Button, Link } from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";
import WorkIcon from "@mui/icons-material/Work";
import { AuthContext } from "../store/AuthContext";
import { DropdownMenu } from "./DropdownMenu";

export const TopNavBar = () => {

    const { authStatus, changeAuthStatus } = useContext(AuthContext);
    const navigate = useNavigate();

    const registerMenuItems = [
        <Link
            component={RouterLink}
            to="/candidate-register"
            underline="none">Register as candidate</Link>,
        <Link
            component={RouterLink}
            to="/recruiter-register"
            underline="none">Register as recruiter</Link>,
    ]

    const handleLogout = () => {
        localStorage.clear();
        changeAuthStatus({
            isLoggedIn: false,
            userType: null
        });
        navigate("/");
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" elevation={0}>
                <Toolbar sx={{ mx: 10 }}>
                    <WorkIcon sx={{ mr: 2 }} />
                    <Link
                        component={RouterLink}
                        to="/"
                        color="inherit"
                        underline="none"
                        level="h3"
                        sx={{ flexGrow: 1 }}>JobLink</Link>
                    <Link
                        component={RouterLink}
                        to="/vacancies"
                        color="inherit"
                        underline="none"
                        sx={{ marginX: 5 }}>BROWSE VACANCIES</Link>
                    <Link
                        component={RouterLink}
                        to="/vacancy-post"
                        color="inherit"
                        underline="none"
                        sx={{ marginX: 5 }}>POST A VACANCY</Link>
                    <Button
                        component={RouterLink}
                        to={authStatus.isLoggedIn ? null : "/login"}
                        size="lg"
                        variant="solid"
                        color="success"
                        onClick={authStatus.isLoggedIn ? handleLogout : null}
                        sx={{ marginX: 2 }}>
                        {authStatus.isLoggedIn ? "LOGOUT" : "LOGIN"}
                    </Button>
                    {authStatus.isLoggedIn && <Button
                        component={RouterLink}
                        to={"/my-profile"}
                        size="lg"
                        variant="solid"
                        color="success"
                        sx={{ marginX: 2 }}>
                        MY PROFILE
                    </Button>}
                    {!authStatus.isLoggedIn && <DropdownMenu
                        label="REGISTER"
                        size="lg"
                        menuItems={registerMenuItems} />}
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ ml: 2, display: "none" }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}