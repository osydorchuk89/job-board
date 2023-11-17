import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { ProfileContext } from "../store/ProfileContext";
import { SnackBarAlert } from "./SnackBarAlert";

export const SnackBarContainer = () => {

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
        <>
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
                text="You successfully edited your profile!"
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
        </>
    );
};