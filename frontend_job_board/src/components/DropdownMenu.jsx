import { Link as RouterLink } from "react-router-dom";
import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import MenuIcon from '@mui/icons-material/Menu';

export const DropdownMenu = props => {

    return (
        <Dropdown>
            <MenuButton
                slots={props.slots}
                slotProps={props.slotProps}
                sx={props.sx}
                variant="solid"
                color={props.color}
                size={props.size}>{props.label}
                {props.iconButton && <MenuIcon sx={{ height: 40, width: 40 }} />}
            </MenuButton>
            <Menu>
                {props.menuItems.map((item, index) =>
                    <MenuItem
                        sx={item.sx}
                        color={props.color}
                        component={item.component ? item.component : RouterLink}
                        to={item.link}
                        onClick={() => item.onClick && item.onClick()}
                        key={index}>
                        {item.text}
                    </MenuItem>
                )}
            </Menu>
        </Dropdown>
    );
}