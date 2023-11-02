import { SearchArea } from "../components/SearchArea";
import { PopularCategories } from "../components/PopularCategories";
import { Container, Typography } from "@mui/joy";

export const Home = props => {

    const onClickSearchDisplay = userQuery => {
        props.onClickSearch(userQuery);
    };

    return (
        <Container>
            <Typography level="h1" sx={{ my: 10, fontWeight: "bold" }}>Find a Job</Typography>
            <SearchArea onClickSearch={onClickSearchDisplay} />
            <PopularCategories />
        </Container>
    )
};