import axios from "axios";
import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Stack } from "@mui/joy";
import { InputField } from "./InputField";
import { SubmitButton } from "./SubmitButton";
import { BASE_URL } from "../utils/config";
import { ProfileContext } from "../store/ProfileContext";

export const RegistrationForm = props => {

    const { profile, changeProfile } = useContext(ProfileContext);

    const location = useLocation();

    const allInputsNotFocused = {
        firstName: false,
        lastName: false,
        password: false,
        email: false,
        phone: false,
        company: false
    };

    const [userInputData, setUserInputData] = useState({});
    const [userProfileData, setUserProfileData] = useState({})
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
    const [inputsFocused, setInputsFocused] = useState(allInputsNotFocused);
    const [passwordIncorrect, setPasswordIncorrect] = useState({});
    const [passwordShort, setPasswordShort] = useState(null);
    const [emailIncorrect, setEmailIncorrect] = useState({});
    const [phoneIncorrect, setPhonelIncorrect] = useState(null);

    const registrationData = useRef();

    useEffect(() => {
        setSubmitButtonClicked(false);
        setUserInputData({});
        setUserProfileData({});
        registrationData.current.reset();
    }, [location])

    const combineInputData = () => {
        const inputUserDataObject = {
            first_name: registrationData.current["firstName"].value.trim(),
            last_name: registrationData.current["lastName"].value.trim(),
            email: registrationData.current["email"].value.trim(),
            password: registrationData.current["password"].value.trim(),
        };
        if (inputUserDataObject.password.length < 8) {
            setPasswordShort(true);
        } else { setPasswordShort(null) };
        const inputProfileDataObject = {
            phone: registrationData.current["phone"].value.trim(),
            country: registrationData.current["country"].value.trim(),
            city: registrationData.current["city"].value.trim(),
            company: props.isCandidateRegistration ? null : registrationData.current["company"].value.trim()
        };
        if (!/^\d+$/.test(inputProfileDataObject.phone)) {
            setPhonelIncorrect(true);
        } else { setPhonelIncorrect(null) };;
        setUserInputData(inputUserDataObject);
        setUserProfileData(inputProfileDataObject)
        return [inputUserDataObject, inputProfileDataObject];
    };

    const navigate = useNavigate();

    const handleRegistration = event => {
        event.preventDefault();
        const [inputUserData, inputProfileData] = combineInputData();
        const userGroup = props.isCandidateRegistration ? "Candidates" : "Recruiters"
        setSubmitButtonClicked(true);
        setInputsFocused(allInputsNotFocused);
        setEmailIncorrect({});
        setPasswordIncorrect({});
        if (
            inputUserData.first_name &&
            inputUserData.last_name &&
            inputUserData.email &&
            inputUserData.password.length >= 8 &&
            (inputProfileData.phone && /^\d+$/.test(inputProfileData.phone)) &&
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
                            changeProfile({
                                ...profile,
                                justRegistered: true,
                            });
                            navigate("/");
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => {
                    if (error.response.status === 400 && Object.hasOwn(error.response.data, "password")) {
                        setPasswordIncorrect(prevData => ({
                            ...prevData,
                            incorrect: true,
                            message: error.response.data.password[0]
                        }));
                    };
                    if (error.response.status === 400 && Object.hasOwn(error.response.data, "email")) {
                        console.log(error.response.data.email[0])
                        setEmailIncorrect(prevData => ({
                            ...prevData,
                            incorrect: true,
                            message: error.response.data.email[0]
                        }));
                    };
                })
        } else { console.log("You should complete all required fields") }
    };

    return (
        <form
            style={{
                display: "flex",
                justifyContent: "center"
            }}
            onSubmit={handleRegistration}
            ref={registrationData}>
            <Stack sx={{ width: { xs: "100%", sm: "90%", md: "80%" } }}>
                <InputField
                    onFocus={() => setInputsFocused(prevState => ({
                        ...prevState,
                        firstName: true
                    }))}
                    label="First Name"
                    placeholder="Enter your first name"
                    name="firstName"
                    fieldIsEmpty={!userInputData.first_name}
                    error={!userInputData.first_name && !inputsFocused.firstName && submitButtonClicked} />
                <InputField
                    onFocus={() => setInputsFocused(prevState => ({
                        ...prevState,
                        lastName: true
                    }))}
                    label="Last Name"
                    placeholder="Enter your last name"
                    name="lastName"
                    fieldIsEmpty={!userInputData.last_name}
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
                    emailIncorrect={emailIncorrect.incorrect}
                    emailIncorrectMessage={emailIncorrect.message}
                    fieldIsEmpty={!userInputData.email}
                    error={(!userInputData.email || emailIncorrect.incorrect) && !inputsFocused.email && submitButtonClicked} />
                <InputField
                    onFocus={() => setInputsFocused(prevState => ({
                        ...prevState,
                        password: true
                    }))}
                    label="Password"
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    passwordShort={passwordShort}
                    passwordShortMessage="The password should have at least 8 characters"
                    passwordIncorrect={passwordIncorrect.incorrect}
                    passwordIncorrectMessage={passwordIncorrect.message}
                    fieldIsEmpty={!userInputData.password}
                    error={(!userInputData.password || passwordIncorrect.incorrect || passwordShort) && !inputsFocused.password && submitButtonClicked} />
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
                    phoneIncorrect={phoneIncorrect}
                    phoneIncorrectMessage="This field should contain only numbers"
                    startDecorator="+"
                    error={(userProfileData.phone !== "" && phoneIncorrect) && !inputsFocused.phone && submitButtonClicked} />
                {!props.isCandidateRegistration && <InputField
                    onFocus={() => setInputsFocused(prevState => ({
                        ...prevState,
                        company: true
                    }))}
                    label="Your Company Name"
                    placeholder="Enter your company"
                    name="company"
                    fieldIsEmpty={!userProfileData.company}
                    error={!userProfileData.company && !inputsFocused.company && submitButtonClicked} />}
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
    );
};