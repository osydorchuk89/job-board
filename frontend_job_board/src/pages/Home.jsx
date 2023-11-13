import { SearchArea } from "../components/SearchArea";
import { PopularCategories } from "../components/PopularCategories";
import { Container, Typography } from "@mui/joy";

export const Home = props => {

    return (
        <Container>
            <Typography
                level="h1"
                sx={{
                    marginTop: { xs: 5, md: 10 },
                    marginBottom: { xs: 0, md: 10 },
                    fontWeight: "bold"
                }}>
                Find a Job
            </Typography>
            <SearchArea marginY={{ xs: 5, md: 20 }} />
            <PopularCategories />
        </Container>
    )
};