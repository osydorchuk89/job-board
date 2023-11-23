import { Link as RouterLink } from "react-router-dom";
import { Sheet, Stack, Link } from '@mui/joy';

export const NavList = props => {
    return (
        <Sheet sx={{ width: "100%", maxWidth: 360, bgcolor: "inherit" }}>
            <Stack spacing={1} alignItems={{ xs: "center", sm: "flex-start" }} >
                {props.listItems.map((item, index) =>
                    <Link
                        key={index}
                        component={RouterLink}
                        to={item.link}
                        sx={{ color: "#FBFCFE", width: "fit-content" }}>{item.text}</Link>
                )}
            </Stack>
        </Sheet>
    );
};