import { FormControl, FormLabel, FormHelperText, Button, styled } from "@mui/joy";

export const FileUploadField = props => {

    const VisuallyHiddenInput = styled("input")`
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        bottom: 0;
        left: 0;
        white-space: nowrap;
        width: 1px;
    `;

    return (
        <FormControl error={props.error} sx={{ marginBottom: 3 }}>
            <FormLabel sx={{ fontSize: "1.1rem" }}>{props.label}</FormLabel>
            <Button
                component="label"
                variant="solid"
            >Upload File
                <VisuallyHiddenInput
                    name={props.name}
                    onClick={props.onClick}
                    onChange={props.onChange}
                    type="file" />
            </Button>
            {props.uploaded && <FormHelperText>
                Uploaded succesfully!
            </FormHelperText>}
            {props.error &&
                <FormHelperText>
                    This field is required.
                </FormHelperText>}
        </FormControl>
    );
};