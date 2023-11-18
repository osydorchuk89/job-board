import { Link as RouterLink } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/joy"

export const ContactInfo = () => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography textAlign="center" level="h3" sx={{ marginBottom: 5 }}>Contact Info</Typography>
                <Typography level="h4">Address</Typography>
                <Typography sx={{ marginBottom: 3 }}>117 Lorem Ipsum, Dolor Sit, Amet, Consectetur</Typography>
                <Typography level="h4">Phone</Typography>
                <Typography sx={{ marginBottom: 3 }}>+123 456 789</Typography>
                <Typography level="h4">Email Address</Typography>
                <Typography>
                    <RouterLink
                        onClick={e => {
                            e.preventDefault();
                            window.location.href = "mailto:email@address.com";
                        }}
                        sx={{ marginBottom: 3 }}>email@address.com
                    </RouterLink>
                </Typography>
            </CardContent>
        </Card>
    );
};