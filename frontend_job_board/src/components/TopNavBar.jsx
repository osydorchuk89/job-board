import AppBar from "@mui/material/AppBar";
import { Box, Button, Link, Toolbar, IconButton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import WorkIcon from "@mui/icons-material/Work";

export const TopNavBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" elevation={0}>
                <Toolbar sx={{ mx: 10 }}>
                    <WorkIcon sx={{ mr: 2 }} />
                    <Link href="/" color="inherit" underline="none" variant="h6" sx={{ flexGrow: 1 }}>
                        JobLink
                    </Link>
                    <Button
                        component={RouterLink}
                        to="/vacancies"
                        sx={{ mx: 5 }}
                        color="inherit">FOR CANDIDATES</Button>
                    <Button
                        component={RouterLink}
                        to="/job-post"
                        sx={{ mx: 5 }}
                        color="inherit">FOR EMPLOYERS</Button>
                    <Button
                        component={RouterLink}
                        to="#"
                        size="large"
                        variant="contained"
                        color="success"
                        text="LOGIN">LOGIN</Button>
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