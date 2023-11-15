import axios from "axios";
import { ApplicationsDetails } from "../components/ApplicationsDetails";
import { BASE_URL } from "../utils/config";

export const Applications = () => {
    return (
        <ApplicationsDetails />
    );
};

export const applicationsLoader = async () => {
    const isCandidate = localStorage.getItem("user_type") === "candidate";
    const additionalURL = isCandidate ? "api/candidates/me" : "api/companies/recruiters/me"
    try {
        const applicationURL = BASE_URL + additionalURL
        const response = await axios({
            method: "get",
            url: applicationURL,
            headers: {
                Authorization: "JWT " + localStorage.getItem("access_token")
            }
        });
        if (isCandidate) {
            return response.data.candidate_applications
        } else {
            return response.data.recruiter_applications
        };
    } catch (error) {
        console.error(error);
    };
};