import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Typography, Link } from "@mui/joy";
import { ProfileContext } from "../store/ProfileContext";

export const SnackBarAlert = props => {

    const navigate = useNavigate();
    const { profile, changeProfile } = useContext(ProfileContext);

    return (
        <Snackbar
            sx={{
                marginTop: 10,
                justifyContent: "center"
            }}
            size="sm"
            open={props.open}
            autoHideDuration={2000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            color="success"
            variant="soft"
            onClose={props.onClose}
            slotProps={props.slotProps}
        >
            <Typography
                color="inherit">
                {props.text}
            </Typography>
            <Link
                sx={{
                    textDecoration: "underline",
                    "&:hover": {
                        textDecoration: "underline"
                    }
                }}
                onClick={event => {
                    event.preventDefault();
                    props.setAlert(false);
                    changeProfile({
                        ...profile,
                        justRegistered: null
                    });
                    navigate(props.navigateLink);
                }}
            >{props.linkText}</Link>
        </Snackbar >
    );
};