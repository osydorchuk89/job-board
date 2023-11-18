import axios from "axios";
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/joy";
import { BASE_URL } from "../utils/config";
import { InputField } from "./InputField";
import { SubmitButton } from "./SubmitButton";
import { ProfileContext } from "../store/ProfileContext";

export const UserProfileForm = () => {

    const { profile, changeProfile } = useContext(ProfileContext);

    const allInputsNotFocused = {
        firstName: false,
        lastName: false,
        email: false,
        company: false
    };

    const registrationData = useRef();
    const [userInputData, setUserInputData] = useState({});
    const [userProfileData, setUserProfileData] = useState({})
    const [companyName, setCompanyName] = useState("");
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
    const [inputsFocused, setInputsFocused] = useState(allInputsNotFocused);
    const [emailIncorrect, setEmailIncorrect] = useState({});
    const [phoneIncorrect, setPhonelIncorrect] = useState(null);
    const isCandidate = localStorage.getItem("user_type") === "candidate"
    const userId = localStorage.getItem("user_id");

    const combineInputData = () => {
        const inputUserDataObject = {
            id: userId,
            first_name: registrationData.current["firstName"].value.trim(),
            last_name: registrationData.current["lastName"].value.trim(),
            email: registrationData.current["email"].value.trim(),
            user_group: isCandidate ? "candidate" : "recruiter"
        };
        const inputProfileDataObject = {
            phone: registrationData.current["phone"].value.trim(),
            country: registrationData.current["country"].value.trim(),
            city: registrationData.current["city"].value.trim(),
            company: isCandidate ? null : registrationData.current["company"].value.trim(),
        };
        if (!/^\d+$/.test(inputProfileDataObject.phone)) {
            setPhonelIncorrect(true);
        } else { setPhonelIncorrect(null) };
        setUserInputData(inputUserDataObject);
        setUserProfileData(inputProfileDataObject);
        return [inputUserDataObject, inputProfileDataObject];
    };

    let navigate = useNavigate();

    const handleEditProfile = event => {
        event.preventDefault();
        const [inputUserData, inputProfileData] = combineInputData();
        setSubmitButtonClicked(true);
        setInputsFocused(allInputsNotFocused);
        setEmailIncorrect({})
        if (
            inputUserData.first_name &&
            inputUserData.last_name &&
            inputUserData.email &&
            (!inputProfileData.phone || /^\d+$/.test(inputProfileData.phone)) &&
            (isCandidate || inputProfileData.company)
        ) {
            axios({
                method: "put",
                url: BASE_URL + `auth/users/me/`,
                data: inputUserData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "JWT " + localStorage.getItem("access_token")
                }
            })
                .then(() => {
                    localStorage.setItem("email", inputUserData.email);
                    localStorage.setItem("first_name", inputUserData.first_name);
                    localStorage.setItem("last_name", inputUserData.last_name);
                    localStorage.setItem("phone", inputProfileData.phone);
                    inputProfileData.country && localStorage.setItem("country", inputProfileData.country)
                    inputProfileData.city && localStorage.setItem("city", inputProfileData.city)
                    inputProfileData.company && localStorage.setItem("company", inputProfileData.company)
                    const userTypeUrl = isCandidate ? "api/candidates/me/" : "api/companies/recruiters/me/"
                    const editProfileUrl = BASE_URL + userTypeUrl
                    axios({
                        method: "put",
                        url: editProfileUrl,
                        data: { ...inputProfileData, user: userId },
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: "JWT " + localStorage.getItem("access_token")
                        }
                    })
                        .then(() => {
                            changeProfile({
                                ...profile,
                                justEditedProfile: true,
                            });
                            navigate("/");
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => {
                    if (error.response.status === 400 && Object.hasOwn(error.response.data, "email")) {
                        setEmailIncorrect(prevData => ({
                            ...prevData,
                            incorrect: true,
                            message: error.response.data.email[0]
                        }));
                    } else { console.log(error) };
                })
        } else { console.log("You should complete all required fields") }
    };

    return (
        <form style={{ display: "flex", justifyContent: "center" }} onSubmit={handleEditProfile} ref={registrationData}>
            <Stack sx={{ width: { xs: "100%", sm: "80%", md: "60%" } }}>
                <InputField
                    defaultValue={localStorage.getItem("first_name")}
                    onFocus={() => setInputsFocused(prevState => ({
                        ...prevState,
                        firstName: true
                    }))}
                    label="First Name"
                    placeholder="Enter your first name"
                    name="firstName"
                    fieldIsEmpty={!userInputData.first_name}
                    error={!userInputData.first_name && !inputsFocused.firstName && submitButtonClicked}
                />
                <InputField
                    defaultValue={localStorage.getItem("last_name")}
                    onFocus={() => setInputsFocused(prevState => ({
                        ...prevState,
                        name: true
                    }))}
                    label="Last Name"
                    placeholder="Enter your last name"
                    name="lastName"
                    fieldIsEmpty={!userInputData.last_name}
                    error={!userInputData.last_name && !inputsFocused.lastName && submitButtonClicked}
                />
                <InputField
                    defaultValue={localStorage.getItem("email")}
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
                    error={(!userInputData.email || emailIncorrect.incorrect) && !inputsFocused.email && submitButtonClicked}
                />
                <InputField
                    defaultValue={localStorage.getItem("phone")}
                    onFocus={() => setInputsFocused(prevState => ({
                        ...prevState,
                        phone: true
                    }))}
                    label="Your Phone Number"
                    placeholder="Enter your phone"
                    name="phone"
                    type="tel"
                    maxLength="15"
                    // onInvalid={e => e.target.setCustomValidity("This field should contain only numbers")}
                    startDecorator="+"
                    phoneIncorrect={phoneIncorrect}
                    phoneIncorrectMessage="This field should contain only numbers"
                    error={(userProfileData.phone !== "" && phoneIncorrect) && !inputsFocused.phone && submitButtonClicked}
                />
                {localStorage.getItem("user_type") === "recruiter" && <InputField
                    defaultValue={localStorage.getItem("company")}
                    onFocus={() => setInputsFocused(prevState => ({
                        ...prevState,
                        company: true
                    }))}
                    label="Your Company Name"
                    placeholder="Enter your company"
                    name="company"
                    fieldIsEmpty={!userProfileData.company}
                    error={!userProfileData.company && !inputsFocused.company && submitButtonClicked}
                />}
                <InputField
                    defaultValue={localStorage.getItem("country") || ""}
                    onFocus={() => setInputsFocused(prevState => ({
                        ...prevState,
                        country: true
                    }))}
                    label="Country"
                    placeholder="Enter country"
                    name="country" />
                <InputField
                    defaultValue={localStorage.getItem("city") || ""}
                    onFocus={() => setInputsFocused(prevState => ({
                        ...prevState,
                        city: true
                    }))}
                    label="City"
                    placeholder="Enter city"
                    name="city" />
                <SubmitButton label="EDIT PROFILE" />
            </Stack>
        </form>
    );
};