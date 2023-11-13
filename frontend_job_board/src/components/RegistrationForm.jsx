import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Typography, Stack, Box } from "@mui/joy";
import { InputField } from "./InputField";
import { SubmitButton } from "./SubmitButton";
import { BASE_URL } from "../utils/config";

export const RegistrationForm = props => {

    const { pathname } = useLocation();

    const allInputsNotFocused = {
        firstName: false,
        lastName: false,
        password: false,
        email: false,
        company: false
    };

    const [userInputData, setUserInputData] = useState({});
    const [companyName, setCompanyName] = useState("");
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
    const [inputsFocused, setInputsFocused] = useState(allInputsNotFocused);

    const registrationData = useRef();

    const combineInputData = () => {
        const inputUserDataObject = {
            first_name: registrationData.current["firstName"].value.trim(),
            last_name: registrationData.current["lastName"].value.trim(),
            email: registrationData.current["email"].value.trim(),
            password: registrationData.current["password"].value.trim(),
        };
        let inputProfileDataObject = {
            phone: registrationData.current["phone"].value.trim(),
            country: registrationData.current["country"].value.trim(),
            city: registrationData.current["city"].value.trim()
        };
        if (!props.isCandidateRegistration) {
            inputProfileDataObject = {
                ...inputProfileDataObject,
                company: registrationData.current["company"].value.trim(),
            }
        }
        setUserInputData(inputUserDataObject);
        inputProfileDataObject.company && setCompanyName(inputProfileDataObject.company)
        return [inputUserDataObject, inputProfileDataObject];
    };

    let navigate = useNavigate();

    const handleRegistration = event => {
        event.preventDefault();
        const [inputUserData, inputProfileData] = combineInputData();
        const userGroup = props.isCandidateRegistration ? "Candidates" : "Recruiters"
        console.log(inputUserData);
        console.log(inputProfileData);
        setSubmitButtonClicked(true);
        setInputsFocused(allInputsNotFocused);
        if (
            inputUserData.first_name &&
            inputUserData.last_name &&
            inputUserData.email &&
            inputUserData.password &&
            (props.isCandidateRegistration || inputProfileData.company)
        ) {
            axios({
                method: "post",
                url: BASE_URL + "auth/users/",
                data: { ...inputUserData, user_group: userGroup },
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(response => {
                    const newUserId = response.data.id;
                    const userTypeUrl = props.isCandidateRegistration ? "api/candidates/" : "api/companies/recruiters/"
                    const navigateURL = props.isCandidateRegistration ? "/candidate-register/success" : "/recruiter-register/success"
                    const addProfileUrl = BASE_URL + userTypeUrl
                    axios({
                        method: "post",
                        url: addProfileUrl,
                        data: { ...inputProfileData, user: newUserId },
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                        .then(() => {
                            navigate(navigateURL, { state: { previousPath: pathname } });
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        } else { console.log("You should complete all required fields") }
    };

    return (
        <Container sx={{ marginY: 5 }}>
            <Typography level="h3" textAlign="center" sx={{ marginBottom: 5 }}>
                Register Your {
                    props.isCandidateRegistration ? "Candidate" : "Recruiter"
                } Account
            </Typography>
            <form style={{ display: "flex", justifyContent: "center" }} onSubmit={handleRegistration} ref={registrationData}>
                <Stack sx={{ width: { xs: "100%", sm: "90%", md: "80%" } }}>
                    <InputField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            firstName: true
                        }))}
                        label="First Name"
                        placeholder="Enter your first name"
                        name="firstName"
                        error={!userInputData.first_name && !inputsFocused.firstName && submitButtonClicked} />
                    <InputField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            lastName: true
                        }))}
                        label="Last Name"
                        placeholder="Enter your last name"
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
                    {!props.isCandidateRegistration && <InputField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            company: true
                        }))}
                        label="Your Company Name"
                        placeholder="Enter your company"
                        name="company"
                        error={!companyName && !inputsFocused.company && submitButtonClicked} />}
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
                    <SubmitButton label="REGISTER" />
                </Stack>
            </form>
        </Container>
    );
};