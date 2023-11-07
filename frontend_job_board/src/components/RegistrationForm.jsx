import { useState, useRef } from "react";
import { Container, Typography, Stack, Button } from "@mui/joy";
import { InputField } from "./InputField";

export const RegistrationForm = () => {

    const allInputsNotFocused = {
        name: false,
        password: false,
        email: false,
        phone: false
    };

    const [userInputData, setUserInputData] = useState({});
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
    const [inputsFocused, setInputsFocused] = useState(allInputsNotFocused);

    const registrationData = useRef();

    const combineInputData = () => {
        const inputDataObject = {
            name: registrationData.current["name"].value,
            email: registrationData.current["email"].value,
            password: registrationData.current["password"].value,
            phone: registrationData.current["phone"].value,
        };
        setUserInputData(inputDataObject);
        return inputDataObject;
    };

    const handleRegistration = event => {
        event.preventDefault();
        const inputData = combineInputData();
        console.log(inputData);
    };

    return (
        <Container maxWidth="md" sx={{ marginY: 5 }}>
            <Typography level="h3" textAlign="center" sx={{ marginBottom: 5 }}>
                Register Your Account
            </Typography>
            <form onSubmit={handleRegistration} ref={registrationData}>
                <Stack>
                    <InputField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            name: true
                        }))}
                        label="Your Name"
                        placeholder="Enter your full name"
                        name="name"
                        error={!userInputData.name && !inputsFocused.name && submitButtonClicked} />
                    <InputField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            email: true
                        }))}
                        label="Your Email"
                        placeholder="Enter your email"
                        name="email"
                        type="email"
                        error={!userInputData.email && !inputsFocused.email && submitButtonClicked} />
                    <InputField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            password: true
                        }))}
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                        type="password"
                        minLength="8"
                        error={!userInputData.password && !inputsFocused.password && submitButtonClicked} />
                    <InputField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            phone: true
                        }))}
                        label="Your Phone Number"
                        placeholder="Enter your phone"
                        name="phone"
                        type="tel"
                        maxLength="15"
                        pattern="\d*"
                        startDecorator="+"
                        // onInvalid={e => e.target.setCustomValidity("This field should contain only numbers")}
                        error={!userInputData.phone && !inputsFocused.phone && submitButtonClicked} />
                    <Button
                        type="submit"
                        variant="solid"
                        color="success">SUBMIT YOUR APPLICATION</Button>
                </Stack>
            </form>
        </Container>
    );
};