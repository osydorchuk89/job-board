import { IconButton } from "@mui/joy";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const PasswordToggleIcon = props => {
    return (
        <IconButton onClick={props.onClick}>
            <VisibilityIcon />
        </IconButton>
    );
};