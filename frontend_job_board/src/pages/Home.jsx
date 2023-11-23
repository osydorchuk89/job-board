import { SearchArea } from "../components/SearchArea";
import { PopularCategories } from "../components/PopularCategories";
import { Container, Typography } from "@mui/joy";
import { SnackBarContainer } from "../components/SnackBarContainer";

export const Home = () => {

    return (
        <Container>
            <Typography
                level="h1"
                sx={{
                    paddingTop: { xs: 10, md: 15 },
                    marginBottom: { xs: 0, md: 10 },
                    fontWeight: "bold"
                }}>
                Find a Job
            </Typography>
            <SearchArea marginY={{ xs: 5, md: 20 }} />
            <PopularCategories />
            <SnackBarContainer />
        </Container>
    )
};