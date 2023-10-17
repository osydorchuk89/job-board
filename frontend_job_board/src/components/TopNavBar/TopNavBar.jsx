import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import WorkIcon from "@mui/icons-material/Work";
import { AccentedButton } from "../elements/AccentedButton";

export const TopNavBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" elevation={0}>
                <Toolbar sx={{ mx: 10 }}>
                    <WorkIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        JobLink
                    </Typography>
                    <Button sx={{ mx: 5 }} color="inherit">FOR CANDIDATES</Button>
                    <Button sx={{ mx: 5 }} color="inherit">FOR EMPLOYERS</Button>
                    <AccentedButton text="CONTACT US" />
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