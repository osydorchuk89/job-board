import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { AccentedButton } from "../elements/AccentedButton";
import { NavList } from "../elements/NavList";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export const BottomNavBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" elevation={0}>
                <Toolbar sx={{ mx: 10, mt: 2, alignItems: "start" }}>
                    <Box sx={{ flexGrow: 1, width: "20%", mr: 2 }}>
                        <Typography variant="h6">ABOUT US</Typography>
                        <Typography variant="body2" component="p">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, laborum corporis maiores ab, impedit quisquam necessitatibus voluptas, non placeat odio nam nihil amet omnis nemo?</Typography>
                        <AccentedButton text="READ MORE"></AccentedButton>
                    </Box>
                    <Box sx={{ flexGrow: 1, width: "20%", mr: 2 }}>
                        <Typography variant="h6">NAVIGATE</Typography>
                        <NavList
                            firstItem="About"
                            secondItem="Services"
                            thirdItem="News"
                            forthItem="Careers"
                        ></NavList>
                    </Box>
                    <Box sx={{ flexGrow: 1, width: "20%", mr: 2 }}>
                        <Typography variant="h6">CATEGORIES</Typography>
                        <NavList
                            firstItem="Full-Time"
                            secondItem="Part-Time"
                            thirdItem="Freelance"
                            forthItem="Internship"
                        ></NavList>
                    </Box>
                    <Box sx={{ flexGrow: 1, width: "20%", mr: 2 }}>
                        <Typography variant="h6">SOCIAL MEDIA</Typography>
                        <FacebookIcon />
                        <InstagramIcon />
                        <TwitterIcon />
                        <LinkedInIcon />
                    </Box>
                </Toolbar>
                <Typography align="center" sx={{ mt: 2 }}>Copyright © 2023 All Rights Reserved</Typography>
            </AppBar>
        </Box>
    );
}