import { Link as RouterLink } from 'react-router-dom';
import { Sheet, List, ListItem, ListItemButton, ListItemContent } from '@mui/joy';

export const NavList = props => {
    return (
        <Sheet sx={{ width: "100%", maxWidth: 360, bgcolor: "inherit" }}>
            <List sx={props.sx}>
                {props.listItems.map((item, index) =>
                    <ListItem key={index}>
                        <ListItemButton
                            component={RouterLink}
                            to="#"
                            color="inherit">
                            <ListItemContent sx={{ color: "white" }}>{item}</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
        </Sheet>
    );
};