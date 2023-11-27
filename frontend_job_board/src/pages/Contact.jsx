import { Container, Stack } from "@mui/joy";
import { ContactForm } from "../components/ContactForm";
import { ContactInfo } from "../components/ContactInfo";
import { AboutUsInfo } from "../components/AboutUsInfo";

export const Contact = () => {
    return (
        <Container sx={{ paddingY: 5 }}>
            <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems="flextStart"
                spacing={3}>
                <ContactForm />
                <Stack sx={{ width: { xs: "100%", md: "40%" } }} spacing={3}>
                    <ContactInfo />
                    <AboutUsInfo />
                </Stack>
            </Stack>
        </Container>
    );
};