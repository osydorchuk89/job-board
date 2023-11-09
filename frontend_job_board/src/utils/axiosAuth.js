import axios from "axios";
import { BASE_AUTH_URL } from "./config";

export const axiosAuthInstance = axios.create({
    baseURL: BASE_AUTH_URL,
    headers: {
        Authorization: localStorage.getItem("access_token")
            ? "JWT " + localStorage.getItem("access_token")
            : null,
        "Content-Type": "application/json",
        accept: "application/json",
    },
});

axiosAuthInstance.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const originalRequest = error.config;
        if (
            error.response.data.code === "token_not_valid" &&
            error.response.status === 401 &&
            error.response.statusText === "Unauthorized"
        ) {
            const refreshToken = localStorage.getItem("refresh_token");

            if (refreshToken) {
                const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

                // exp date in token is expressed in seconds, while now() returns milliseconds:
                const now = Math.ceil(Date.now() / 1000);
                console.log(tokenParts.exp);

                if (tokenParts.exp > now) {
                    return axiosAuthInstance
                        .post("/token/refresh/", { refresh: refreshToken })
                        .then((response) => {
                            localStorage.setItem("access_token", response.data.access);
                            localStorage.setItem("refresh_token", response.data.refresh);

                            axiosAuthInstance.defaults.headers["Authorization"] =
                                "JWT " + response.data.access;
                            originalRequest.headers["Authorization"] =
                                "JWT " + response.data.access;

                            return axiosAuthInstance(originalRequest);
                        })
                        .catch(error => console.log(error));
                } else {
                    console.log("Refresh token is expired", tokenParts.exp, now);
                    window.location.href = "/login/";
                }
            } else {
                console.log("Refresh token not available.");
                window.location.href = "/login/";
            }
        }
        // specific error handling done elsewhere
        return Promise.reject(error);
    }
);