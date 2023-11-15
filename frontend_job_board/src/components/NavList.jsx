import { Sheet, Stack } from '@mui/joy';
import { NavigationLink } from './NavigationLink';

export const NavList = props => {
    return (
        <Sheet sx={{ width: "100%", maxWidth: 360, bgcolor: "inherit" }}>
            <Stack spacing={1} alignItems={{ xs: "center", sm: "flex-start" }} >
                {props.listItems.map((item, index) =>
                    <NavigationLink
                        key={index}
                        to="#"
                        item={item} />
                )}
            </Stack>
        </Sheet>
    );
};