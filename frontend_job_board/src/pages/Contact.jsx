import { Container, Stack, Card, CardContent } from "@mui/joy";
import { ContactForm } from "../components/ContactForm";

export const Contact = () => {
    return (
        <Container sx={{ paddingY: 5 }}>
            <Stack direction="row" alignItems="center">
                <ContactForm />
            </Stack>
        </Container>
    );
};