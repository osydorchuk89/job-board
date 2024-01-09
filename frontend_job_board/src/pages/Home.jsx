import { useState, useEffect, useContext } from "react";
import { Container, Typography } from "@mui/joy";
import { AuthContext } from "../store/AuthContext";
import { FeedbackContext } from "../store/FeedbackContext";
import { SearchArea } from "../components/SearchArea";
import { PopularCategories } from "../components/PopularCategories";
import { SnackBarAlert } from "../components/SnackBarAlert";

export const Home = () => {

    const { authStatus, changeAuthStatus } = useContext(AuthContext);
    let { feedback, changeFeedback } = useContext(FeedbackContext);

    const [loggedInAlert, setLoggedInAlert] = useState(false);
    const [loggedOutAlert, setLoggedOutAlert] = useState(false);
    const [postedFeedbackAlert, setPostedFeedbackAlert] = useState(false);

    useEffect(() => {
        authStatus.justLoggedIn && setLoggedInAlert(true);
        authStatus.justLoggedOut && setLoggedOutAlert(true);
        feedback && setPostedFeedbackAlert(true);

        return () => {
            authStatus.justLoggedIn = false;
            authStatus.justLoggedOut = false;
            feedback = false;
        }
    }, []);

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
            <Container>
                <SnackBarAlert
                    open={loggedInAlert}
                    text="You successfully logged in!"
                    onClose={() => {
                        setLoggedInAlert(false);
                        changeAuthStatus({
                            ...authStatus,
                            justLoggedIn: null
                        });
                    }}
                />
                <SnackBarAlert
                    open={loggedOutAlert}
                    text="You logged out!"
                    onClose={() => {
                        setLoggedOutAlert(false);
                        changeAuthStatus({
                            ...authStatus,
                            justLoggedOut: null
                        });
                    }}
                />
                <SnackBarAlert
                    open={postedFeedbackAlert}
                    text="You successfully sent a message!"
                    onClose={() => {
                        setPostedFeedbackAlert(false);
                        changeFeedback(null);
                    }}
                />
            </Container>
        </Container>
    )
};