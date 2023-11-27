import { Link as RouterLink } from "react-router-dom";
import { Button, Card, CardContent, CardActions, Typography, Link } from "@mui/joy"

export const NewsCard = props => {
    return (
        <Card variant="outlined" sx={{ marginY: 5 }}>
            <CardContent>
                <Typography level="h3" sx={{ marginBottom: 2 }}>
                    <Link
                        component={RouterLink}
                        to="#">{props.title}</Link>
                </Typography>
                <Typography sx={{
                    marginTop: 2,
                    display: { xs: "none", md: "block" }
                }}>
                    {props.summary}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    component={RouterLink}
                    to="#"
                    size="lg"
                    variant="solid"
                    color="success"
                    sx={{
                        width: { xs: "50%", md: "40%", lg: "30%" }
                    }}>READ MORE</Button>
            </CardActions>
        </Card>
    )
}