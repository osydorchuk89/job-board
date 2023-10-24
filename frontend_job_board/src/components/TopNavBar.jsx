import AppBar from "@mui/material/AppBar";
import { Box, Toolbar, IconButton } from "@mui/material";
import { Button, Link } from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";
import WorkIcon from "@mui/icons-material/Work";

export const TopNavBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" elevation={0}>
                <Toolbar sx={{ mx: 10 }}>
                    <WorkIcon sx={{ mr: 2 }} />
                    <Link
                        href="/"
                        color="inherit"
                        underline="none"
                        level="h3"
                        sx={{ flexGrow: 1 }}>JobLink</Link>
                    <Link
                        href="/vacancies"
                        color="inherit"
                        underline="none"
                        sx={{ marginX: 5 }}>FOR CANDIDATES</Link>
                    <Link
                        href="/job-post"
                        color="inherit"
                        underline="none"
                        sx={{ marginX: 5 }}>FOR EMPLOYERS</Link>
                    <Button
                        component="a"
                        href="#"
                        size="lg"
                        variant="solid"
                        color="success">LOGIN</Button>
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