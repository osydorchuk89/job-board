import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/joy";

export const NavigationLink = props => {
    return (
        <Link
            sx={{ color: "#FBFCFE", width: "fit-content" }}
            component={RouterLink}
            to={props.to}
            level={props.level}>
            {props.item}
        </Link>
    );
};