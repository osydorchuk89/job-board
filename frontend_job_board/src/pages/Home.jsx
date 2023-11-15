import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchArea } from "../components/SearchArea";
import { PopularCategories } from "../components/PopularCategories";
import { SnackBarAlert } from "../components/SnackBarAlert";
import { Container, Typography } from "@mui/joy";
import { AuthContext } from "../store/AuthContext";
import { ProfileContext } from "../store/ProfileContext";

export const Home = () => {

    const navigate = useNavigate();

    const { authStatus, changeAuthStatus } = useContext(AuthContext);
    const { profile, changeProfile } = useContext(ProfileContext);

    const [loggedInAlert, setLoggedInAlert] = useState(false);
    const [loggedOutAlert, setLoggedOutAlert] = useState(false);
    const [registeredAlert, setRegisteredAlert] = useState(false);
    const [editedProfileAlert, setEditedProfileAlert] = useState(false);
    const [appliedAlert, setAppliedAlert] = useState(false);
    const [postedVacancyAlert, setPosterVacancyAlert] = useState(false);
    const [editedVacancyAlert, setEditedVacancyAlert] = useState(false);
    const [deletedVacancyAlert, setDeletedVacancyAlert] = useState(false);

    useEffect(() => {
        authStatus.justLoggedOut && setLoggedOutAlert(true);
        authStatus.justLoggedIn && setLoggedInAlert(true);
        profile.justRegistered && setRegisteredAlert(true);
        profile.justEditedProfile && setEditedProfileAlert(true);
        profile.justApplied && setAppliedAlert(true);
        profile.justPostedVacancy && setPosterVacancyAlert(true);
        profile.justEditedVacancy && setEditedVacancyAlert(true);
        profile.justDeletedVacancy && setDeletedVacancyAlert(true);
    }, []);

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
            <SnackBarAlert
                open={loggedInAlert}
                autoHideDuration={2000}
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
                autoHideDuration={2000}
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
                open={registeredAlert}
                autoHideDuration={2000}
                text="You succesfully registered!"
                // linkText="Go to login page"
                // onClick={() => {
                //     setRegisteredAlert(false);
                //     changeProfile({
                //         ...profile,
                //         justRegistered: null
                //     });
                //     navigate("/login");
                // }}
                onClose={() => {
                    setRegisteredAlert(false);
                    changeProfile({
                        ...profile,
                        justRegistered: null
                    });
                }}
            />
            <SnackBarAlert
                open={editedProfileAlert}
                autoHideDuration={2000}
                text="You edited your profile!"
                // linkText="Go to your profile page"
                // onClick={() => {
                //     setEditedProfileAlert(false);
                //     changeProfile({
                //         ...profile,
                //         justEditedProfile: null
                //     });
                //     navigate("/my-profile");
                // }}
                // slotProps={{
                //     onClickAway: () => {
                //         setEditedProfileAlert(false);
                //         changeProfile({
                //             ...profile,
                //             justEditedProfile: null
                //         });
                //     }
                // }}
                onClose={() => {
                    setEditedProfileAlert(false);
                    changeProfile({
                        ...profile,
                        justEditedProfile: null
                    });
                }}
            />
            <SnackBarAlert
                open={appliedAlert}
                autoHideDuration={2000}
                text="You succesfully applied for a vacancy"
                onClose={() => {
                    setAppliedAlert(false);
                    changeProfile({
                        ...profile,
                        justApplied: null
                    });
                }}
            />
            <SnackBarAlert
                open={postedVacancyAlert}
                autoHideDuration={2000}
                text="You successfully posted a vacancy!"
                onClose={() => {
                    setPosterVacancyAlert(false);
                    changeProfile({
                        ...profile,
                        justPostedVacancy: null
                    });
                }}
            />
            <SnackBarAlert
                open={editedVacancyAlert}
                autoHideDuration={2000}
                text="You successfully edited a vacancy!"
                onClose={() => {
                    setEditedVacancyAlert(false);
                    changeProfile({
                        ...profile,
                        justEditedVacancy: null
                    });
                }}
            />
            <SnackBarAlert
                open={deletedVacancyAlert}
                autoHideDuration={2000}
                text="You deleted a vacancy!"
                onClose={() => {
                    setDeletedVacancyAlert(false);
                    changeProfile({
                        ...profile,
                        justDeletedVacancy: null
                    });
                }}
            />
        </Container>
    )
};