import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Input, Typography, Stack } from "@mui/joy";

export const SearchArea = props => {

    const userQuery = useRef(null);

    let navigate = useNavigate();

    const handleSearch = event => {
        event.preventDefault();
        const userInputTitle = userQuery.current["jobTitle"].value;
        const userInputLocation = userQuery.current["location"].value;
        const userInputData = {
            vacancyTitle: userInputTitle,
            vacancyLocation: userInputLocation
        };
        props.onClickSearch(userInputData);
        console.log(userInputData)
        navigate("/vacancies");
    };

    return (
        <Container>
            <Typography level="h1" sx={{ my: 10, fontWeight: "bold" }}>Find a Job</Typography>
            <form ref={userQuery} onSubmit={handleSearch}>
                <Stack direction="row">
                    <Input
                        sx={{ mr: 10 }}
                        placeholder="Job Title"
                        name="jobTitle"
                    />
                    <Input
                        sx={{ mr: 10 }}
                        placeholder="Location"
                        name="location"
                    />
                    <Button
                        type="submit"
                        size="lg"
                        variant="solid"
                        color="success">SEARCH</Button>
                </Stack>
            </form>
        </Container>
    );
};