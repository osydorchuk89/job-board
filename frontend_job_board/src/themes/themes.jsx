import { extendTheme } from "@mui/joy/styles";

export const Theme = extendTheme({
    components: {
        JoyLink: {
            styleOverrides: {
                root: {
                    color: "#0B6BCB",
                    textDecoration: "none",
                    ":hover": {
                        textDecoration: "none",
                        color: "#12467B"
                    },
                },
            },
        },
    },
    fontFamily: {
        display: "Roboto",
        body: "Roboto"
    },
});