import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, TextField, Typography } from "@mui/material";

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
        navigate("/vacancies");
    };

    return (
        <Container>
            <Typography variant="h2" component="h2" sx={{ my: 10, fontWeight: "bold" }}>Find a Job</Typography>
            <form ref={userQuery} onSubmit={handleSearch}>
                <TextField
                    size="small"
                    sx={{ mr: 10 }}
                    label="Job Title"
                    name="jobTitle"
                />
                <TextField
                    size="small"
                    sx={{ mr: 10 }}
                    label="Location"
                    name="location"
                />
                <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="success">SEARCH</Button>
            </form>
        </Container>
    );
};