import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AccentedButton } from '../elements/AccentedButton';

export const SearchArea = () => {
    return (
        <Container>
            <Typography variant="h2" component="h2" sx={{ my: 10, fontWeight: 'bold' }}>Find a Job</Typography>
            <TextField size="small" sx={{ mr: 10 }} label="Job Title" />
            <TextField size="small" sx={{ mr: 10 }} label="Location" />
            <AccentedButton text="SEARCH">SEARCH</AccentedButton>
        </Container>
    );
};