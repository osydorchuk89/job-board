import axios from "axios";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Alert } from "@mui/joy";
import { AuthContext } from "../store/AuthContext";
import { InputField } from "./InputField";
import { PasswordToggleIcon } from "./PasswordToggleIcon";
import { BASE_URL } from "../utils/config";

export const LoginForm = () => {

    const allInputsNotFocused = {
        email: false,
        password: false,
    };

    const [invalidCredentials, setInvalidCredentials] = useState(null);
    const [userInputData, setUserInputData] = useState({});
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
    const [inputsFocused, setInputsFocused] = useState(allInputsNotFocused);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formIncomplete, setFormIncomplete] = useState(null);

    const loginData = useRef();
    const navigate = useNavigate();
    const { changeAuthStatus } = useContext(AuthContext);

    const handleLogin = event => {
        event.preventDefault();
        setSubmitButtonClicked(true);
        setInvalidCredentials(null);
        setInputsFocused(allInputsNotFocused);
        const userLoginData = {
            email: loginData.current["email"].value.trim(),
            password: loginData.current["password"].value.trim(),
        };
        setUserInputData(userLoginData);
        if (userLoginData.email && userLoginData.password) {
            setFormIncomplete(false);
            axios({
                method: "post",
                url: BASE_URL + "auth/jwt/token/",
                data: userLoginData,
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                },
            })
                .then(response => {
                    setInvalidCredentials(false);
                    const profileURL = response.data.user_group === "Candidates" ? "api/candidates/me/" : "api/companies/recruiters/me/"
                    localStorage.setItem("access_token", response.data.access);
                    localStorage.setItem("refresh_token", response.data.refresh);
                    localStorage.setItem("user_id", response.data.user_id);
                    localStorage.setItem("email", response.data.email);
                    localStorage.setItem("first_name", response.data.first_name);
                    localStorage.setItem("last_name", response.data.last_name)
                    localStorage.setItem("user_type", response.data.user_group);
                    changeAuthStatus({
                        isLoggedIn: true,
                        userType: response.data.user_group,
                        justLoggedIn: true
                    });
                    axios({
                        method: "get",
                        url: BASE_URL + profileURL,
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: "JWT " + localStorage.getItem("access_token")
                        }
                    })
                        .then(response => {
                            localStorage.setItem("profile_id", response.data.id);
                            localStorage.setItem("phone", response.data.phone);
                            response.data.country && localStorage.setItem("country", response.data.country);
                            response.data.city && localStorage.setItem("city", response.data.city);
                            response.data.company && localStorage.setItem("company", response.data.company);
                            navigate("/");
                        })
                        .catch(error => console.log(error));
                })
                .catch(error => {
                    error.response.status === 401 && setInvalidCredentials(true);
                });
        } else { setFormIncomplete(true) };
    };

    return (
        <form ref={loginData} onSubmit={handleLogin}>
            <Typography sx={{ marginTop: 2, marginBottom: 5 }} level="h3" textAlign="center">
                Login to Your Account
            </Typography>
            <InputField
                label="Email"
                name="email"
                placeholder="Enter your email"
                type="email"
                onFocus={() => setInputsFocused(prevState => ({
                    ...prevState,
                    email: true
                }))}
                fieldIsEmpty={!userInputData.email}
                error={!userInputData.email && !inputsFocused.email && submitButtonClicked} />
            <InputField
                label="Password"
                name="password"
                placeholder="Enter your password"
                type={passwordVisible ? "text" : "password"}
                onFocus={() => setInputsFocused(prevState => ({
                    ...prevState,
                    password: true
                }))}
                endDecorator={<PasswordToggleIcon onClick={() => setPasswordVisible(value => !value)} />}
                fieldIsEmpty={!userInputData.password}
                error={!userInputData.password && !inputsFocused.password && submitButtonClicked} />
            {invalidCredentials && !inputsFocused.email && !inputsFocused.password && <Typography
                color="danger"
                sx={{ marginBottom: 5 }}>Invalid email and/or password</Typography>}
            {formIncomplete && !Object.values(inputsFocused).some(val => val === true) &&
                <Alert sx={{ display: "flex", justifyContent: "center" }} color="danger">
                    <Typography color="danger">You should complete all required fields</Typography>
                </Alert>}
            <Button
                size="lg"
                type="submit"
                variant="solid"
                color="success"
                sx={{ marginTop: 2 }}>LOGIN</Button>
        </form>
    )
};