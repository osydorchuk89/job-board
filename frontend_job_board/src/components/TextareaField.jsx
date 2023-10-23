import { FormControl, FormLabel, Textarea } from "@mui/joy";


export const TextareaField = props => {
    return (
        <FormControl sx={{ marginBottom: 3 }}>
            <FormLabel sx={{ fontSize: "1.1rem" }}>{props.label}</FormLabel>
            <Textarea name={props.name} placeholder={props.placeholder} minRows={2} />
        </FormControl>
    );
};