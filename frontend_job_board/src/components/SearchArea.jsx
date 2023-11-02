import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Stack } from "@mui/joy";

export const SearchArea = props => {

    const userQuery = useRef(null);

    let navigate = useNavigate();

    const handleSearch = event => {
        event.preventDefault();
        const userInputTitle = userQuery.current["title"].value.trim();
        const userInputCity = userQuery.current["city"].value.trim();
        const userInputData = {
            vacancyTitle: userInputTitle,
            vacancyCity: userInputCity
        };
        props.onClickSearch(userInputData);
        console.log(userInputData)
        navigate("/vacancies");
    };

    return (
        <form ref={userQuery} onSubmit={handleSearch} >
            <Stack direction="row" justifyContent="space-between" sx={{ my: 5 }}>
                <Input
                    sx={{ mr: 10, width: "33%" }}
                    placeholder="Title"
                    name="title"
                />
                <Input
                    sx={{ mr: 10, width: "33%" }}
                    placeholder="City"
                    name="city"
                />
                <Button
                    type="submit"
                    size="lg"
                    variant="solid"
                    color="success">SEARCH</Button>
            </Stack>
        </form>
    );
};