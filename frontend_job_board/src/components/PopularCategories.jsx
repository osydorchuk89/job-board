import { Box, Button } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

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
                <Button variant="outlined">London, UK</Button>
                <Button variant="outlined">San Fransisco, USA</Button>
                <Button variant="outlined">Toronto, Canada</Button>
            </Box>
        </Container>
    );
};