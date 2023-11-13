import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Typography, Sheet, Stack, IconButton } from "@mui/joy";
import { NavList } from "./NavList";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export const BottomNavBar = () => {

    const boxSxProps = {
        width: { xs: "50%", sm: "20%" },
        display: { xs: "flex", sm: "block" },
        flexDirection: { xs: "column" },
        alignItems: { xs: "center" },
        marginRight: 2,
        marginBottom: { xs: 5, sm: 0 }
    };

    const navigateListItems = [
        "About",
        "Services",
        "News",
        "Careers"
    ];
    const categoriesListItems = [
        "Full-Time",
        "Part-Time",
        "Freelance",
        "Internship"
    ];

    return (
        <Sheet variant="solid" color="primary" sx={{
            bgcolor: "primary.main",
            width: "100%",
            maxHeight: 700,
            bottom: 0,
        }}>
            <Stack>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "center", sm: "flex-start" }}
                    sx={{ height: "100%", marginX: { xs: 3, md: 5 }, paddingTop: 3 }}
                >
                    <Box sx={boxSxProps}>
                        <Typography
                            level="h5"
                            sx={{
                                marginBottom: 1,
                                display: { xs: "none", sm: "flex" }
                            }}>ABOUT US</Typography>
                        <Typography
                            level="body2"
                            component="p"
                            sx={{
                                display: { xs: "none", lg: "block" },
                                marginBottom: 1
                            }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Earum, laborum corporis maiores ab, impedit quisquam necessitatibus voluptas,
                            non placeat odio nam nihil amet omnis nemo?</Typography>
                        <Button
                            component={RouterLink}
                            to="/about-us"
                            variant="solid"
                            color="success"
                            size="sm"
                            sx={{ display: { xs: "none", sm: "inline-block" } }}>READ MORE</Button>
                        <Button
                            component={RouterLink}
                            to="/about-us"
                            variant="solid"
                            color="success"
                            size="sm"
                            sx={{ display: { xs: "inline-block", sm: "none" } }}>ABOUT US</Button>
                    </Box>
                    <Box sx={boxSxProps}>
                        <Typography level="h5">NAVIGATE</Typography>
                        <NavList
                            sx={{
                                display: { xs: "flex", sm: "block" },
                                flexDirection: { xs: "column" },
                                alignItems: { xs: "center" },
                            }}
                            listItems={navigateListItems}
                        ></NavList>
                    </Box>
                    <Box sx={boxSxProps}>
                        <Typography level="h5">CATEGORIES</Typography>
                        <NavList
                            sx={{
                                display: { xs: "flex", sm: "block" },
                                flexDirection: { xs: "column" },
                                alignItems: { xs: "center" },
                            }}
                            listItems={categoriesListItems}
                        ></NavList>
                    </Box>
                    <Box sx={boxSxProps}>
                        <Typography level="h5" sx={{ marginBottom: 1 }}>SOCIAL MEDIA</Typography>
                        <Box>
                            <IconButton href="#" color="inherit" size="xs"><FacebookIcon /></IconButton>
                            <IconButton href="#" color="inherit" size="xs"><InstagramIcon /></IconButton>
                            <IconButton href="#" color="inherit" size="xs"><TwitterIcon /></IconButton>
                            <IconButton href="#" color="inherit" size="xs"><LinkedInIcon /></IconButton>
                        </Box>
                    </Box>
                </Stack>
                <Typography level="body2" align="center" sx={{ marginTop: { xs: 0, sm: 2 } }}>Copyright © 2023 All Rights Reserved</Typography>
            </Stack>
        </Sheet>
    );
}