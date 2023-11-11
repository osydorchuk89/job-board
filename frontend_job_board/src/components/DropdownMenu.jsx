import { Dropdown, Menu, MenuButton, MenuItem } from '@mui/joy';

export const DropdownMenu = props => {
    return (
        <Dropdown>
            <MenuButton
                variant="solid"
                color="success"
                size={props.size}>{props.label}</MenuButton>
            <Menu>
                {props.menuItems.map((item, index) =>
                    <MenuItem key={index}>{item}</MenuItem>
                )}
            </Menu>
        </Dropdown>
    );
}