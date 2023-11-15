import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Button, Typography, Stack } from "@mui/joy";
import { UserQueryContext } from "../store/UserQueryContext";

const PopularCategory = props => {

    const { changeQuery } = useContext(UserQueryContext);
    const navigate = useNavigate();

    return (
        <Box sx={{ paddingY: 5 }}>
            <Typography level="h4" sx={{ marginBottom: 2, fontWeight: "bold" }}>{props.title}</Typography>
            <Stack direction="row" spacing={{ xs: 2, md: 5 }}>
                {props.popularItems.map((item, index) => <Button
                    key={index}
                    size="lg"
                    variant="outlined"
                    color="primary"
                    onClick={event => {
                        event.preventDefault();
                        const userInputData = {
                            [props.queryField]: item,
                        };
                        changeQuery(userInputData);
                        navigate("/vacancies");
                    }}
                >{item}</Button>)}
            </Stack>
        </Box>
    );
};

export const PopularCategories = () => {

    const popularPositions = [
        "Front-End Developer",
        "Back-End Developer",
        "Data Scientist"
    ];

    const popularLocations = [
        "London",
        "New York",
        "Boston"
    ];

    return (
        <Container disableGutters sx={{ marginTop: 10, paddingX: 0 }}>
            <PopularCategory
                title="Popular Positions"
                popularItems={popularPositions}
                queryField="vacancyTitle"
            />
            <PopularCategory
                title="Popular Locations"
                popularItems={popularLocations}
                queryField="vacancyCity"
            />
        </Container>
    );
};