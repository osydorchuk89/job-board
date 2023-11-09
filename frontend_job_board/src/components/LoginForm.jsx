import { useContext } from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/joy";
import { AuthContext } from "../store/AuthContext";
import { InputField } from "./InputField";
import { axiosAuthInstance } from "../utils/axiosAuth";

export const LoginForm = props => {

    const loginData = useRef();
    const navigate = useNavigate();
    const { changeLoggedIn } = useContext(AuthContext);

    const handleLogin = event => {
        event.preventDefault();
        axiosAuthInstance
            .post("auth/jwt/create/", {
                email: loginData.current["email"].value.trim(),
                password: loginData.current["password"].value.trim(),
            })
            .then(result => {
                localStorage.setItem("access_token", result.data.access);
                localStorage.setItem("refresh_token", result.data.refresh);
                axiosAuthInstance.defaults.headers["Authorization"] = "JWT " + localStorage.getItem("access_token");
                changeLoggedIn(true);
                console.log("SUCCESS!!!");
                navigate("/");
            });
    };

    return (
        <form ref={loginData} onSubmit={handleLogin}>
            <Typography sx={{ marginBottom: 5 }} level="h3" textAlign="center">Login to Your {
                props.isCandidateLogin ? "Candidate" : "Recruiter"
            } Account</Typography>
            <InputField
                size="lg"
                label="Email"
                name="email"
                placeholder="Enter your email"
                type="email" />
            <InputField
                size="lg"
                label="Password"
                name="password"
                placeholder="Enter your password"
                type="password" />
            <Button
                size="lg"
                type="submit"
                variant="solid"
                color="success" >LOGIN</Button>
        </form>
    )
};