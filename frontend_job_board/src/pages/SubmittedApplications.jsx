import axios from "axios";
import { Stack } from "@mui/joy";
import { SubmittedApplicationsDetails } from "../components/SubmittedApplicationsDetails";
import { BASE_URL } from "../utils/config";

export const SubmittedApplications = () => {
    return (
        <Stack>
            <SubmittedApplicationsDetails />
        </Stack>
    );
};

export const submittedApplicationsLoader = async ({ request, params }) => {
    try {
        const vacancyURL = BASE_URL + "api/candidates/me"
        const response = await axios({
            method: "get",
            url: vacancyURL,
            headers: {
                Authorization: "JWT " + localStorage.getItem("access_token")
            }
        });
        return response.data.candidate_applications;
    } catch (error) {
        console.error(error);
    };
};