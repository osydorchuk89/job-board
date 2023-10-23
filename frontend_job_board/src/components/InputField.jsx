import { FormControl, FormLabel, FormHelperText, Input } from "@mui/joy";


export const InputField = props => {
    return (
        <FormControl error={props.error} sx={{ marginBottom: 3 }}>
            <FormLabel sx={{ fontSize: "1.1rem" }}>{props.label}</FormLabel>
            <Input name={props.name} onBlur={props.onBlur} placeholder={props.placeholder} />
            {props.error && <FormHelperText>
                This field is required.
            </FormHelperText>}
        </FormControl>
    );
};