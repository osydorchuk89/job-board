import axios from "axios";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/joy";
import { AuthContext } from "../store/AuthContext";
import { InputField } from "./InputField";
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

    const loginData = useRef();
    const navigate = useNavigate();
    const { changeAuthStatus } = useContext(AuthContext);

    const handleLogin = event => {
        event.preventDefault();
        setSubmitButtonClicked(true);
        setInputsFocused(allInputsNotFocused);
        const userLoginData = {
            email: loginData.current["email"].value.trim(),
            password: loginData.current["password"].value.trim(),
        };
        setUserInputData(userLoginData);
        if (userLoginData.email && userLoginData.password) {
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
                    const profileURL = response.data.user_group === "Candidates" ? "api/candidates/me" : "api/companies/recruiters/me"
                    const loggedInUserType = response.data.user_group === "Candidates" ? "candidate" : "recruiter"
                    console.log(response.data);
                    localStorage.setItem("access_token", response.data.access);
                    localStorage.setItem("refresh_token", response.data.refresh);
                    localStorage.setItem("user_id", response.data.user_id);
                    localStorage.setItem("email", response.data.email);
                    localStorage.setItem("first_name", response.data.first_name);
                    localStorage.setItem("last_name", response.data.last_name)
                    localStorage.setItem("user_type", loggedInUserType);
                    changeAuthStatus({
                        isLoggedIn: true,
                        userType: loggedInUserType
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
                            localStorage.setItem("profile_id", response.data.id)
                            localStorage.setItem("phone", response.data.phone)
                            response.data.country && localStorage.setItem("country", response.data.country)
                            response.data.city && localStorage.setItem("city", response.data.city)
                            response.data.company && localStorage.setItem("company", response.data.company)
                            console.log("SUCCESS!!!");
                        })
                        .catch(error => console.log(error))
                    navigate("/");
                })
                .catch(error => {
                    error.response.status === 401 && setInvalidCredentials(true);
                });
        } else { console.log("You should complete the required fields") };
    };

    return (
        <form ref={loginData} onSubmit={handleLogin}>
            <Typography sx={{ marginBottom: 5 }} level="h3" textAlign="center">
                Login to Your Account
            </Typography>
            <InputField
                size="lg"
                label="Email"
                name="email"
                placeholder="Enter your email"
                type="email"
                onFocus={() => setInputsFocused(prevState => ({
                    ...prevState,
                    email: true
                }))}
                error={!userInputData.email && !inputsFocused.email && submitButtonClicked} />
            <InputField
                size="lg"
                label="Password"
                name="password"
                placeholder="Enter your password"
                type="password"
                onFocus={() => setInputsFocused(prevState => ({
                    ...prevState,
                    password: true
                }))}
                error={!userInputData.password && !inputsFocused.password && submitButtonClicked} />
            {invalidCredentials && !inputsFocused.email && !inputsFocused.password && <Typography
                color="danger"
                sx={{ marginBottom: 5 }}>Invalid email and/or password</Typography>}
            <Button
                size="lg"
                type="submit"
                variant="solid"
                color="success" >LOGIN</Button>
        </form>
    )
};