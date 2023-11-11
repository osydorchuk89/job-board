import { FormControl, FormLabel, Input } from "@mui/joy";

export const DisabledInputField = props => {
    return (
        <FormControl sx={{ marginBottom: 3 }}>
            <FormLabel sx={{ fontSize: "1.1rem" }}>{props.label}</FormLabel>
            <Input
                disabled
                placeholder={props.placeholder} />
        </FormControl>
    );
};