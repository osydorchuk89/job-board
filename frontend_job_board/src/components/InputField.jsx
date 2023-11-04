import { FormControl, FormLabel, FormHelperText, Input } from "@mui/joy";

export const InputField = props => {
    return (
        <FormControl error={props.error} sx={{ marginBottom: 3 }}>
            <FormLabel sx={{ fontSize: "1.1rem" }}>{props.label}</FormLabel>
            <Input
                defaultValue={props.defaultValue}
                name={props.name}
                placeholder={props.placeholder}
                onFocus={props.onFocus}
                type={props.type}
                startDecorator={props.startDecorator}
                slotProps={{
                    input: {
                        min: props.min,
                        maxLength: props.maxLength,
                        pattern: props.pattern,
                        onInvalid: props.onInvalid,
                        ref: props.inputRef
                    }
                }} />
            {props.error &&
                <FormHelperText>
                    This field is required.
                </FormHelperText>}
        </FormControl>
    );
};