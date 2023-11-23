import { useLayoutEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Button, Container, Typography } from "@mui/joy";
import { TopNavBar } from "../components/TopNavBar";
import { BottomNavBar } from "../components/BottomNavBar";

export const Error = () => {

    const ScrollToTopWrapper = ({ children }) => {
        const location = useLocation();
        useLayoutEffect(() => {
            document.documentElement.scrollTo(0, 0);
        }, [location.pathname]);
        return children;
    };

    return (
        <ScrollToTopWrapper>
            <TopNavBar></TopNavBar>
            <Container
                sx={{
                    paddingTop: { xs: 15, xl: 20 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                <Typography
                    level="h1"
                    sx={{ marginBottom: { xs: 15, xl: 20 } }}>Uh-oh!</Typography>
                <Typography
                    level="body-lg"
                    sx={{ marginBottom: { xs: 15, xl: 20 } }}>There is no such page...</Typography>
                <Button
                    variant="solid"
                    color="success"
                    size="lg"
                    component={RouterLink}
                    to="/"
                    sx={{ marginBottom: { xs: 15, xl: 20 } }}>
                    BACK TO HOME PAGE
                </Button>
            </Container>
            <BottomNavBar />
        </ScrollToTopWrapper>
    );
};