import axios from "axios";
import { useRef, useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/joy";
import { InputField } from "./InputField";
import { TextareaField } from "../components/TextareaField";
import { SubmitButton } from "./SubmitButton";
import { AuthContext } from "../store/AuthContext"
import { FeedbackContext } from "../store/FeedbackContext";
import { BASE_URL } from "../utils/config"

export const ContactForm = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { authStatus } = useContext(AuthContext);
    const { changeFeedback } = useContext(FeedbackContext);

    const allInputsNotFocused = {
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        message: false
    };

    const [userInputData, setUserInputData] = useState({});
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
    const [inputsFocused, setInputsFocused] = useState(allInputsNotFocused);
    const [phoneIncorrect, setPhonelIncorrect] = useState(null);

    const contactFormData = useRef();

    useEffect(() => {
        setSubmitButtonClicked(false);
        setUserInputData({});
        contactFormData.current.reset();
    }, [location])

    const combineInputData = () => {
        const inputDataObject = {
            user: authStatus.isLoggedIn ? +localStorage.getItem("user_id") : null,
            first_name: authStatus.isLoggedIn
                ? localStorage.getItem("first_name")
                : contactFormData.current["firstName"].value.trim(),
            last_name: authStatus.isLoggedIn
                ? localStorage.getItem("last_name")
                : contactFormData.current["lastName"].value.trim(),
            email: authStatus.isLoggedIn
                ? localStorage.getItem("email")
                : contactFormData.current["email"].value.trim(),
            phone: authStatus.isLoggedIn
                ? localStorage.getItem("phone")
                : contactFormData.current["phone"].value.trim(),
            message: contactFormData.current["message"].value.trim(),
        };
        if (!/^\d+$/.test(inputDataObject.phone)) {
            setPhonelIncorrect(true);
        } else { setPhonelIncorrect(null) };
        setUserInputData(inputDataObject);
        return inputDataObject;
    };

    const handleSubmitContactForm = event => {
        event.preventDefault();
        const inputUserData = combineInputData();
        setSubmitButtonClicked(true);
        setInputsFocused(allInputsNotFocused);
        if (
            inputUserData.first_name &&
            inputUserData.last_name &&
            inputUserData.email &&
            inputUserData.message &&
            (!inputUserData.phone || /^\d+$/.test(inputUserData.phone))
        ) {
            axios({
                method: "post",
                url: BASE_URL + "api/feedback/",
                data: inputUserData,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(() => {
                    changeFeedback(true);
                    navigate("/");
                })
                .catch(error => {
                    console.log(error);
                });
        } else { console.log("You should complete all required fields") };
    };

    return (
        <Card variant="outlined" sx={{ width: { xs: "100%", md: "60%" }, alignItems: "center" }}>
            <CardContent sx={{ width: "100%" }}>
                <Typography textAlign="center" level="h3" sx={{ marginBottom: 5 }}>
                    Contact Us
                </Typography>
                <Typography color="danger" sx={{ marginBottom: 2 }}>
                    Mandatory fields are marked with asterisk (*)
                </Typography>
                <form
                    style={{ display: "flex", flexDirection: "column" }}
                    ref={contactFormData}
                    onSubmit={handleSubmitContactForm}>
                    <InputField
                        disabled={authStatus.isLoggedIn}
                        defaultvalue={authStatus.isLoggedIn ? localStorage.getItem("first_name") : ""}
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            firstName: true
                        }))}
                        label="First Name*"
                        placeholder={authStatus.isLoggedIn ? localStorage.getItem("first_name") : "Enter your first name"}
                        name="firstName"
                        fieldIsEmpty={!userInputData.first_name}
                        error={!userInputData.first_name && !inputsFocused.firstName && submitButtonClicked} />
                    <InputField
                        disabled={authStatus.isLoggedIn}
                        defaultvalue={authStatus.isLoggedIn ? localStorage.getItem("last_name") : ""}
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            lastName: true
                        }))}
                        label="Last Name*"
                        placeholder={authStatus.isLoggedIn ? localStorage.getItem("last_name") : "Enter your last name"}
                        name="lastName"
                        fieldIsEmpty={!userInputData.last_name}
                        error={!userInputData.last_name && !inputsFocused.lastName && submitButtonClicked} />
                    <InputField
                        disabled={authStatus.isLoggedIn}
                        defaultvalue={authStatus.isLoggedIn ? localStorage.getItem("email") : ""}
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            email: true
                        }))}
                        label="Email*"
                        placeholder={authStatus.isLoggedIn ? localStorage.getItem("email") : "Enter your email"}
                        name="email"
                        type="email"
                        fieldIsEmpty={!userInputData.email}
                        error={!userInputData.email && !inputsFocused.email && submitButtonClicked} />
                    <InputField
                        disabled={authStatus.isLoggedIn}
                        defaultvalue={authStatus.isLoggedIn ? localStorage.getItem("phone") : ""}
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            phone: true
                        }))}
                        label="Phone Number"
                        placeholder={authStatus.isLoggedIn ? localStorage.getItem("phone") : "Enter your phone"}
                        name="phone"
                        type="tel"
                        maxLength="15"
                        startDecorator="+"
                        phoneIncorrect={phoneIncorrect}
                        phoneIncorrectMessage="This field should contain only numbers"
                        error={(userInputData.phone !== "" && phoneIncorrect) && !inputsFocused.phone && submitButtonClicked} />
                    <TextareaField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            message: true
                        }))}
                        label="Message*"
                        placeholder="Enter your message here"
                        name="message"
                        error={!userInputData.message && !inputsFocused.message && submitButtonClicked} />
                    <SubmitButton
                        label="SEND MESSAGE"
                        sx={{
                            width: { xs: "80%", sm: "50%", md: "40%" },
                            marginTop: 3,
                            alignSelf: "center"
                        }} />
                </form>
            </CardContent>
        </Card>
    );
};