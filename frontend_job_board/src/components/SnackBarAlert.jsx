import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Typography, Link, IconButton } from "@mui/joy";
import CloseIcon from '@mui/icons-material/Close';
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
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            color="success"
            variant="soft"
            autoHideDuration={3000}
            onClose={props.onClose}
            slotProps={props.slotProps}
            endDecorator={
                <IconButton
                    onClick={props.onClose}
                    size="sm"
                    variant="soft"
                    color="success"
                >
                    <CloseIcon />
                </IconButton>
            }
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