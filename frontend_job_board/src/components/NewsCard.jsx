import { Link as RouterLink } from "react-router-dom";
import { Button, Card, CardContent, CardActions, Typography, Link } from "@mui/joy"

export const NewsCard = props => {
    return (
        <Card variant="outlined"
            sx={{
                marginY: 5,
                width: { xs: "100%", sm: "80%" }
            }}>
            <CardContent>
                <Typography level="h3" sx={{ marginBottom: 2 }}>
                    <Link
                        component={RouterLink}
                        to="#">{props.title}</Link>
                </Typography>
                <Typography sx={{
                    marginTop: 2,
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
                >READ MORE</Button>
                <Button sx={{ display: "none" }} />
            </CardActions>
        </Card>
    )
}