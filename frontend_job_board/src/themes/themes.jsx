import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import Button from "@mui/joy/Button";

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
        display: "Segoe UI",
        body: "Segoe UI"
    },
});