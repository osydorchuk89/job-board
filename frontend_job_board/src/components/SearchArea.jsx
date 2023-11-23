import { useRef, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Input, Stack } from "@mui/joy";
import { UserQueryContext } from "../store/UserQueryContext";

export const SearchArea = props => {

    const { changeQuery } = useContext(UserQueryContext);
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    const [searchIsActive, setSearchIsActive] = useState(false);
    const userQuery = useRef(null);

    let navigate = useNavigate();

    const handleSearch = event => {
        event.preventDefault();
        const userInputData = {
            vacancyTitle: userQuery.current["title"].value.trim(),
            vacancyCompany: userQuery.current["company"].value.trim(),
            vacancyCity: userQuery.current["city"].value.trim()
        };
        changeQuery(userInputData);
        navigate("/vacancies");
    };

    return (
        <form ref={userQuery} onSubmit={handleSearch} >
            <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" sx={{ paddingY: props.paddingY }}>
                <Button
                    onClick={() => setSearchIsActive(prevValue => !prevValue)}
                    sx={{
                        width: "50%",
                        alignSelf: "center",
                        display: { xs: !isHomePage ? "block" : "none", md: "none" }
                    }}
                >
                    {searchIsActive ? "HIDE SEARCH BAR" : "SHOW SEARCH BAR"}
                </Button>
                <Input
                    sx={{
                        width: { xs: "100%", md: "25%" },
                        marginY: { xs: 2, md: 0 },
                        display: { xs: searchIsActive || isHomePage ? "flex" : "none", md: "flex" }
                    }}
                    placeholder="Job Title"
                    name="title"
                />
                <Input
                    sx={{
                        width: { xs: "100%", md: "25%" },
                        marginY: { xs: 2, md: 0 },
                        display: { xs: searchIsActive || isHomePage ? "flex" : "none", md: "flex" }
                    }}
                    placeholder="Company"
                    name="company"
                />
                <Input
                    sx={{
                        width: { xs: "100%", md: "25%" },
                        marginY: { xs: 2, md: 0 },
                        display: { xs: searchIsActive || isHomePage ? "flex" : "none", md: "flex" }
                    }}
                    placeholder="City"
                    name="city"
                />
                <Button
                    type="submit"
                    size="lg"
                    variant="solid"
                    color="success"
                    sx={{
                        marginTop: { xs: 2, md: 0 },
                        display: { xs: searchIsActive || isHomePage ? "block" : "none", md: "block" }
                    }}>SEARCH</Button>
            </Stack>
        </form>
    );
};