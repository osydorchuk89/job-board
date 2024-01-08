import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Stack, Typography } from "@mui/joy";
import { UserProfileMenu } from "../components/UserProfileMenu";
import { SnackBarAlert } from "../components/SnackBarAlert";
import { AuthContext } from "../store/AuthContext";
import { ProfileContext } from "../store/ProfileContext";

export const UserProfile = () => {

    const navigate = useNavigate();
    const { authStatus } = useContext(AuthContext);
    const { profile, changeProfile } = useContext(ProfileContext);

    const [editedProfileAlert, setEditedProfileAlert] = useState(false);
    const [appliedAlert, setAppliedAlert] = useState(false);
    const [postedVacancyAlert, setPostedVacancyAlert] = useState(false);
    const [editedVacancyAlert, setEditedVacancyAlert] = useState(false);
    const [deletedVacancyAlert, setDeletedVacancyAlert] = useState(false);

    useEffect(() => {
        !authStatus.isLoggedIn && navigate("/login");
        profile.justApplied && setAppliedAlert(true);
        profile.justEditedProfile && setEditedProfileAlert(true);
        profile.justPostedVacancy && setPostedVacancyAlert(true);
        profile.justEditedVacancy && setEditedVacancyAlert(true);
        profile.justDeletedVacancy && setDeletedVacancyAlert(true);
    }, []);

    return (
        <Stack direction="column" alignItems="center" spacing={5} sx={{ paddingY: 10 }}>
            <Typography textAlign="center" level="h2">
                Hello, {localStorage.getItem("first_name")} {localStorage.getItem("last_name")}!
            </Typography>
            <UserProfileMenu />
            <Container>
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
                        setPostedVacancyAlert(false);
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
            </Container>
        </Stack >
    );
};