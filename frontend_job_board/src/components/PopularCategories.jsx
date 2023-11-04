import { Container, Box, Button, Typography } from "@mui/joy";

export const PopularCategories = () => {
    return (
        <Container sx={{ mt: 10 }}>
            <Box sx={{ mb: 5 }}>
                <Typography sx={{ mb: 2, fontWeight: "bold" }}>Popular Positions</Typography>
                <Button variant="outlined">Data Scientist</Button>
                <Button variant="outlined">Front-End Developer</Button>
                <Button variant="outlined">QA Engineer</Button>
            </Box>
            <Box sx={{ mb: 5 }}>
                <Typography sx={{ mb: 2, fontWeight: "bold" }}>Popular Locations</Typography>
                <Button variant="outlined">London</Button>
                <Button variant="outlined">San Fransisco</Button>
                <Button variant="outlined">Toronto</Button>
            </Box>
        </Container>
    );
};