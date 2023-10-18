import axios from "axios";
import { useState } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AccentedButton } from './elements/AccentedButton';
import { BASE_URL } from "../utils/config";

export const SearchArea = () => {

    const [vacancyTitle, setVacancyTitle] = useState("");
    const [vacancyLocation, setVacancyLocation] = useState("");

    const handleSearch = async () => {
        let queryURL = `${BASE_URL}/vacancies/?`
        if (vacancyLocation) {
            const query = "city";
            const value = vacancyLocation;
            queryURL += `&${query}=${value}`
        };
        if (vacancyTitle) {
            const query = "industry";
            const value = vacancyTitle;
            queryURL += `&${query}=${value}`
        };

        try {
            const response = await axios.get(queryURL);
            console.log(response);
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <Container>
            <Typography variant="h2" component="h2" sx={{ my: 10, fontWeight: "bold" }}>Find a Job</Typography>
            <TextField
                size="small"
                sx={{ mr: 10 }}
                label="Job Title"
                onChange={event => setVacancyTitle(event.target.value)}
            />
            <TextField
                size="small"
                sx={{ mr: 10 }}
                label="Location"
                onChange={event => setVacancyLocation(event.target.value)}
            />
            <AccentedButton onClick={handleSearch} text="SEARCH">SEARCH</AccentedButton>
        </Container>
    );
};