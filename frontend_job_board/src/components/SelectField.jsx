import { useState, useEffect } from "react";
import { FormControl, FormLabel, FormHelperText, Select, Option } from "@mui/joy";

export const SelectField = props => {

    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        props.onSelectItem(selectedItem);
    }, [selectedItem]);

    const handleSelect = (event, index) => {
        event && event.preventDefault();
        setSelectedItem(index);
    };

    return (
        <FormControl error={props.error} sx={{ marginBottom: 3 }}>
            <FormLabel sx={{ fontSize: "1.1rem" }}>{props.label}</FormLabel>
            <Select
                defaultValue={props.defaultValue}
                onChange={handleSelect}
                placeholder={props.placeholder}
                onFocus={props.onFocus}>
                {Object.entries(props.options).map(option => (
                    <Option key={option[0]} value={option[0]}>{option[1]}</Option>
                ))}
            </Select>
            {props.error &&
                <FormHelperText>
                    This field is required.
                </FormHelperText>}
        </FormControl>
    );
};