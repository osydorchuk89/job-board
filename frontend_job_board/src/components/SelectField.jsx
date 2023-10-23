import { useState, useEffect } from "react";
import { FormControl, FormLabel, Select, Option } from "@mui/joy";

export const SelectField = props => {

    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        props.onSelectItem(selectedItem);
    }, [selectedItem])

    const handleSelect = (event, index) => {
        event.preventDefault();
        setSelectedItem(index);
    }

    return (
        <FormControl sx={{ marginBottom: 3 }}>
            <FormLabel sx={{ fontSize: "1.1rem" }}>{props.label}</FormLabel>
            <Select onChange={handleSelect} placeholder={props.placeholder}>
                {props.options.map(option => (
                    <Option key={option.value} value={option.value}>{option.text}</Option>
                ))}
            </Select>
        </FormControl>
    );
};