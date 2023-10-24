import { useState, useRef, useEffect } from "react";
import { FormControl, FormLabel, Chip, ChipDelete, Stack } from "@mui/joy";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

export const InputAddItems = props => {

    const userInputRef = useRef();
    const [userItems, setuserItems] = useState([]);

    // I should think how to optimize the code between here
    useEffect(() => {
        props.onAddItem(userItems);
    }, [userItems])
    // and here

    const handleAddItem = () => {
        const newItem = userInputRef.current.value;
        newItem && setuserItems(prevItems => [
            ...prevItems,
            newItem
        ]);
        userInputRef.current.value = "";
    };

    const handleDeleteItem = item => {
        setuserItems(prevItems =>
            prevItems.filter(userItem => userItem !== item)
        );
    };

    return (
        <FormControl sx={{ marginBottom: 3 }}>
            <FormLabel sx={{ fontSize: "1.1rem" }}>{props.label}</FormLabel>
            <TextField inputRef={userInputRef} placeholder={props.placeholder} />
            <Stack sx={{ marginY: 2 }} direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {userItems && userItems.map((item, index) => (
                    <Chip
                        key={index}
                        size="lg"
                        variant="solid"
                        color="primary"
                        sx={{ marginY: 1, maxWidth: "100%" }}
                        endDecorator={<ChipDelete onDelete={() => handleDeleteItem(item)} />}
                    >
                        {item}
                    </Chip>
                ))}
            </Stack>
            <Button
                sx={{ width: "20%", justifyContent: "center" }}
                variant="contained"
                color="success"
                disableElevation
                onClick={handleAddItem}>Add</Button>
        </FormControl >
    );
};