import { Link as RouterLink } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/joy"

export const AboutUs = () => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography textAlign="center" level="h3" sx={{ marginBottom: 5 }}>About Us</Typography>
                <Typography sx={{ marginBottom: 3 }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deleniti illo numquam, odio sed laborum eveniet pariatur eius porro!
                    Animi nesciunt labore necessitatibus quaerat repudiandae voluptate
                    deleniti quam quos repellendus perspiciatis repellat in fugit eius
                    ipsum, enim officia, eveniet fuga at.
                </Typography>
                <Button
                    component={RouterLink}
                    to="/about-us"
                    variant="solid"
                    size="lg"
                    color="success"
                    sx={{
                        width: { xs: "80%", sm: "50%", md: "40%" },
                        alignSelf: "center"
                    }}>READ MORE</Button>
            </CardContent>
        </Card >
    );
};