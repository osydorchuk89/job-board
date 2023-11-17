import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchArea } from "../components/SearchArea";
import { PopularCategories } from "../components/PopularCategories";
import { SnackBarAlert } from "../components/SnackBarAlert";
import { Container, Typography } from "@mui/joy";
import { AuthContext } from "../store/AuthContext";
import { ProfileContext } from "../store/ProfileContext";
import { SnackBarContainer } from "../components/SnackBarContainer";

export const Home = () => {

    return (
        <Container>
            <Typography
                level="h1"
                sx={{
                    paddingTop: { xs: 8, md: 10 },
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