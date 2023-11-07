import { useRef } from "react";
import { Button, Typography } from "@mui/joy";
import { InputField } from "./InputField";


export const LoginForm = () => {

    const loginData = useRef();

    const handleLogin = event => {
        event.preventDefault();
        console.log(loginData.current["email"].value);
        console.log(loginData.current["password"].value);
    };

    return (
        <form ref={loginData} onSubmit={handleLogin}>
            <Typography sx={{ marginBottom: 5 }} level="h3" textAlign="center">Login to Your Account</Typography>
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