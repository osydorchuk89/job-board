import { Link as RouterLink } from "react-router-dom";
import { List, ListItem, ListItemButton, ListItemContent } from "@mui/joy";

export const NavMenuList = props => {
    return (
        <List sx={{
            width: "100%",
            "--ListItem-minHeight": "60px"
        }}>
            {props.items.map((item, index) =>
                <ListItem key={index}>
                    <ListItemButton
                        component={item.component ? item.component : RouterLink}
                        to={item.link ? item.link : null}
                        onClick={() => {
                            props.setMenuOpen(false);
                            item.onClick && item.onClick()
                        }}
                        color="primary"
                        variant="solid">
                        <ListItemContent sx={{ textAlign: "center", fontSize: "1.3rem" }}>
                            {item.text}
                        </ListItemContent >
                    </ListItemButton>
                </ListItem>)}
        </List>
    );
};