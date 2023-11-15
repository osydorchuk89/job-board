import { Container, Typography } from "@mui/joy";
import { UserProfileForm } from "../components/UserProfileForm";

export const UserProfileEdit = () => {
    return (
        <Container sx={{ paddingY: 5 }}>
            <Typography level="h3" textAlign="center" sx={{ marginBottom: 5 }}>
                Your Profile
            </Typography>
            <UserProfileForm />
        </Container>
    );
};