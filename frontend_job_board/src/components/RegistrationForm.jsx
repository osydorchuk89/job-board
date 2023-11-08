import axios from "axios";
import { useState, useRef } from "react";
import { Container, Typography, Stack, Button } from "@mui/joy";
import { InputField } from "./InputField";
import { BASE_URL, BASE_AUTH_URL } from "../utils/config";

export const RegistrationForm = props => {

    const allInputsNotFocused = {
        firstName: false,
        lastName: false,
        password: false,
        email: false,
    };

    const [userInputData, setUserInputData] = useState({});
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
    const [inputsFocused, setInputsFocused] = useState(allInputsNotFocused);

    const registrationData = useRef();

    const combineInputData = () => {
        const inputUserDataObject = {
            first_name: registrationData.current["firstName"].value,
            last_name: registrationData.current["lastName"].value,
            email: registrationData.current["email"].value,
            password: registrationData.current["password"].value,
        };
        const inputProfileDataObject = {
            phone: registrationData.current["phone"].value,
            country: registrationData.current["country"].value,
            city: registrationData.current["city"].value,
        };
        setUserInputData(inputUserDataObject);
        return [inputUserDataObject, inputProfileDataObject];
    };

    const handleRegistration = event => {
        event.preventDefault();
        const [inputUserData, inputProfileData] = combineInputData();
        console.log(inputUserData);
        console.log(inputProfileData);
        setSubmitButtonClicked(true);
        setInputsFocused(allInputsNotFocused);
        if (
            inputUserData.first_name &&
            inputUserData.last_name &&
            inputUserData.email &&
            inputUserData.password
        ) {
            axios({
                method: "post",
                url: BASE_AUTH_URL + "auth/users/",
                data: inputUserData,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(response => {
                    const newUserId = response.data.id;
                    const userTypeUrl = props.isCandidateRegistration ? "/candidates/" : "/companies/recruiters/"
                    const addProfileUrl = BASE_URL + userTypeUrl
                    axios({
                        method: "post",
                        url: addProfileUrl,
                        data: { ...inputProfileData, user: newUserId },
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                        .then(response => console.log(response))
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        } else { console.log("You should complete the required fields") }
    };

    return (
        <Container sx={{ marginY: 5 }}>
            <Typography level="h3" textAlign="center" sx={{ marginBottom: 5 }}>
                Register Your {
                    props.isCandidateRegistration ? "Candidate" : "Recruiter"
                } Account
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
                        name="firstName"
                        error={!userInputData.first_name && !inputsFocused.firstName && submitButtonClicked} />
                    <InputField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            name: true
                        }))}
                        label="Your Name"
                        placeholder="Enter your full name"
                        name="lastName"
                        error={!userInputData.last_name && !inputsFocused.lastName && submitButtonClicked} />
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
                        // onInvalid={e => e.target.setCustomValidity("Password should be at least 8 characters long")}
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
                        // onInvalid={e => e.target.setCustomValidity("This field should contain only numbers")}
                        startDecorator="+" />
                    <InputField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            country: true
                        }))}
                        label="Country"
                        placeholder="Enter country"
                        name="country" />
                    <InputField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            city: true
                        }))}
                        label="City"
                        placeholder="Enter city"
                        name="city" />
                    <Button
                        type="submit"
                        variant="solid"
                        color="success">SUBMIT YOUR APPLICATION</Button>
                </Stack>
            </form>
        </Container>
    );
};