import { Button, Container, Typography } from "@mui/joy";
import { TopNavBar } from "../components/TopNavBar";
import { BottomNavBar } from "../components/BottomNavBar";

export const Error = () => {
    return (
        <>
            <TopNavBar></TopNavBar>
            <Container>
                <Typography>Oops, there is no such page:(</Typography>
                <Button
                    variant="solid"
                    color="success"
                    component="a"
                    href="/">
                    BACK TO HOME PAGE
                </Button>
            </Container>
            <BottomNavBar />
        </>
    );
};