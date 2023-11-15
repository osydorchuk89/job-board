import { Link as RouterLink } from "react-router-dom";
import { Snackbar, Typography, Link } from "@mui/joy";

export const SnackBarAlert = props => {

    return (
        <Snackbar
            sx={{
                marginTop: 10,
                justifyContent: "center"
            }}
            size="sm"
            open={props.open}
            autoHideDuration={props.autoHideDuration}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            color="success"
            variant="soft"
            onClose={props.onClose}
            slotProps={props.slotProps}
            resumeHideDuration={props.resumeHideDuration}
            disableWindowBlurListener={props.disableWindowBlurListener}
        >
            <Typography
                color="inherit">
                {props.text}
            </Typography>
            <Link
                sx={{
                    color: "#FBFCFE",
                    textDecoration: "underline",
                    "&:hover": {
                        textDecoration: "underline"
                    }
                }}
                onClick={props.onClick}
            >{props.linkText}</Link>
        </Snackbar >
    );
};