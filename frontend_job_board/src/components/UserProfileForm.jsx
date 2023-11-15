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
    const [companyName, setCompanyName] = useState("");
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
    const [inputsFocused, setInputsFocused] = useState(allInputsNotFocused);
    const isCandidate = localStorage.getItem("user_type") === "candidate"

    const combineInputData = () => {
        const inputUserDataObject = {
            first_name: registrationData.current["firstName"].value.trim(),
            last_name: registrationData.current["lastName"].value.trim(),
            email: registrationData.current["email"].value.trim(),
        };
        let inputProfileDataObject = {
            phone: registrationData.current["phone"].value.trim(),
            country: registrationData.current["country"].value.trim(),
            city: registrationData.current["city"].value.trim()
        };
        if (!isCandidate) {
            inputProfileDataObject = {
                ...inputProfileDataObject,
                company: registrationData.current["company"].value.trim(),
            }
        };
        setUserInputData(inputUserDataObject);
        inputProfileDataObject.company && setCompanyName(inputProfileDataObject.company)
        return [inputUserDataObject, inputProfileDataObject];
    };

    let navigate = useNavigate();

    const handleEditProfile = event => {
        event.preventDefault();
        const userId = localStorage.getItem("user_id");
        const [inputUserData, inputProfileData] = combineInputData();
        console.log(inputUserData);
        console.log(inputProfileData);
        console.log()
        setSubmitButtonClicked(true);
        setInputsFocused(allInputsNotFocused);
        if (
            inputUserData.first_name &&
            inputUserData.last_name &&
            inputUserData.email &&
            (isCandidate || inputProfileData.company)
        ) {
            axios({
                method: "put",
                url: BASE_URL + `auth/users/${userId}/`,
                data: { ...inputUserData },
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
                .catch(error => console.log(error))
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
                    error={!userInputData.email && !inputsFocused.email && submitButtonClicked}
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
                    pattern="\d*"
                    // onInvalid={e => e.target.setCustomValidity("This field should contain only numbers")}
                    startDecorator="+" />
                {localStorage.getItem("user_type") === "recruiter" && <InputField
                    defaultValue={localStorage.getItem("company")}
                    onFocus={() => setInputsFocused(prevState => ({
                        ...prevState,
                        company: true
                    }))}
                    label="Your Company Name"
                    placeholder="Enter your company"
                    name="company"
                    error={!companyName && !inputsFocused.company && submitButtonClicked}
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