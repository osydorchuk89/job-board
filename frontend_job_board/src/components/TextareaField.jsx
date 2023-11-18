import { FormControl, FormLabel, FormHelperText, Textarea } from "@mui/joy";

export const TextareaField = props => {
    return (
        <FormControl sx={{ marginBottom: 3 }}>
            <FormLabel sx={{ fontSize: "1.1rem" }}>{props.label}</FormLabel>
            <Textarea
                defaultValue={props.defaultValue}
                name={props.name}
                placeholder={props.placeholder}
                minRows={3}
                error={props.error}
                onFocus={props.onFocus}
            />
            {props.error &&
                <FormHelperText>
                    This field is required.
                </FormHelperText>}
        </FormControl>
    );
};