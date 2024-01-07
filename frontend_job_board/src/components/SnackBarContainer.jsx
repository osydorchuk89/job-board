import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { ProfileContext } from "../store/ProfileContext";
import { FeedbackContext } from "../store/FeedbackContext";
import { SnackBarAlert } from "./SnackBarAlert";
import { Container } from "@mui/joy";

export const SnackBarContainer = () => {

    const { authStatus, changeAuthStatus } = useContext(AuthContext);
    const { profile, changeProfile } = useContext(ProfileContext);
    const { feedback, changeFeedback } = useContext(FeedbackContext);

    const [loggedInAlert, setLoggedInAlert] = useState(false);
    const [loggedOutAlert, setLoggedOutAlert] = useState(false);
    const [registeredAlert, setRegisteredAlert] = useState(false);
    const [editedProfileAlert, setEditedProfileAlert] = useState(false);
    const [appliedAlert, setAppliedAlert] = useState(false);
    const [postedVacancyAlert, setPosterVacancyAlert] = useState(false);
    const [editedVacancyAlert, setEditedVacancyAlert] = useState(false);
    const [deletedVacancyAlert, setDeletedVacancyAlert] = useState(false);
    const [postedFeedbackAlert, setPostedFeedbackAlert] = useState(false);

    useEffect(() => {
        authStatus.justLoggedOut && setLoggedOutAlert(true);
        authStatus.justLoggedIn && setLoggedInAlert(true);
        profile.justRegistered && setRegisteredAlert(true);
        profile.justEditedProfile && setEditedProfileAlert(true);
        profile.justApplied && setAppliedAlert(true);
        profile.justPostedVacancy && setPosterVacancyAlert(true);
        profile.justEditedVacancy && setEditedVacancyAlert(true);
        profile.justDeletedVacancy && setDeletedVacancyAlert(true);
        feedback && setPostedFeedbackAlert(true);

        return () => {
            changeAuthStatus({
                ...authStatus,
                justLoggedIn: null
            });
        };
    }, []);

    return (
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
                open={registeredAlert}
                text="You succesfully registered! Now, please log in to your account."
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
                text="You successfully edited your profile!"
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
                text="You deleted a vacancy!"
                onClose={() => {
                    setDeletedVacancyAlert(false);
                    changeProfile({
                        ...profile,
                        justDeletedVacancy: null
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
    );
};