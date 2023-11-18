import { FormControl, FormLabel, FormHelperText, Input } from "@mui/joy";

export const InputField = props => {
    return (
        <FormControl error={props.error} sx={{ marginBottom: 3 }}>
            <FormLabel sx={{ fontSize: "1.1rem" }}>{props.label}</FormLabel>
            <Input
                size={props.size}
                disabled={props.disabled}
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
                        minLength: props.minLength,
                        pattern: props.pattern,
                        onInvalid: props.onInvalid,
                        ref: props.inputRef,
                    }
                }} />
            {(props.error) &&
                <>
                    {props.fieldIsEmpty && <FormHelperText>
                        This field is required.
                    </FormHelperText>}
                    {props.passwordIncorrect && <FormHelperText>
                        {props.passwordIncorrectMessage}
                    </FormHelperText>}
                    {!props.fieldIsEmpty && props.passwordShort && <FormHelperText>
                        {props.passwordShortMessage}
                    </FormHelperText>}
                    {props.emailIncorrect && <FormHelperText>
                        {props.emailIncorrectMessage}
                    </FormHelperText>}
                    {props.phoneIncorrect && <FormHelperText>
                        {props.phoneIncorrectMessage}
                    </FormHelperText>}
                    {props.salaryIncorrect && <FormHelperText>
                        {props.salaryIncorrectMessage}
                    </FormHelperText>}
                </>}
        </FormControl>
    );
};