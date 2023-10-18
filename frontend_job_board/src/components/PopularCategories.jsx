import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { OutlinedButton } from "./elements/OutlinedButton";

export const PopularCategories = () => {
    return (
        <Box>
            <Container sx={{ mt: 10 }}>
                <Box sx={{ mb: 5 }}>
                    <Typography sx={{ mb: 2, fontWeight: "bold" }}>Popular Positions</Typography>
                    <OutlinedButton text="Data Scientist"></OutlinedButton>
                    <OutlinedButton text="Front-End Developer"></OutlinedButton>
                    <OutlinedButton text="QA Engineer"></OutlinedButton>
                </Box>
                <Box sx={{ mb: 5 }}>
                    <Typography sx={{ mb: 2, fontWeight: "bold" }}>Popular Locations</Typography>
                    <OutlinedButton text="London, UK"></OutlinedButton>
                    <OutlinedButton text="San Fransisco, USA"></OutlinedButton>
                    <OutlinedButton text="Toronto, Canada"></OutlinedButton>
                </Box>
            </Container>
        </Box>
    )
}