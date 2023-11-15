import { Box, IconButton } from "@mui/joy";

export const SocialIcons = props => {
    return (
        <Box>
            {props.items.map((item, index) =>
                <IconButton
                    key={index}
                    href="#"
                    size="xs"
                    color="inherit"
                    sx={{ color: "#f5f5f5", "&:hover": { color: "#12467B" } }}>{item}</IconButton>
            )}
        </Box>
    );
};