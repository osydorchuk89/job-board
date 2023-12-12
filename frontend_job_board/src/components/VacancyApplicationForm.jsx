import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import { Container, Typography, Stack } from "@mui/joy";
import { BASE_URL } from "../utils/config";
import { DisabledInputField } from "./DisabledInputField";
import { FileUploadField } from "./FileUploadField";
import { SubmitButton } from "./SubmitButton";
import { ProfileContext } from "../store/ProfileContext";

export const VacancyApplicationForm = () => {

    const { profile, changeProfile } = useContext(ProfileContext);

    const vacancyData = useRouteLoaderData("vacancy");
    const recruiterId = vacancyData.recruiter;

    const [userInputData, setUserInputData] = useState({});
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
    const [applicationFiles, setApplicationFiles] = useState({
        cv: null,
        coverLetter: null
    });
    const [filesUploaded, setFilesUploaded] = useState({
        cv: false,
        coverLetter: false
    });

    const params = useParams();
    const vacancyId = params.vacancyId;
    let vacancyURL = BASE_URL + `api/vacancies/${vacancyId}/`

    const handleFileUpload = event => {
        event.preventDefault();
        setApplicationFiles(prevState => ({
            ...prevState,
            [event.target.name]: event.target.files[0]
        }));
        setFilesUploaded(prevState => ({
            ...prevState,
            [event.target.name]: true
        }))
    };

    const candidateId = localStorage.getItem("profile_id");

    const combineInputData = () => {
        const inputDataObject = {
            recruiter: recruiterId,
            vacancy: vacancyId,
            candidate: candidateId,
            cv: applicationFiles.cv,
            cover_letter: applicationFiles.coverLetter
        };
        setUserInputData(inputDataObject);
        return inputDataObject;
    }
    let navigate = useNavigate();

    const handleApplicationSubmit = async event => {
        event.preventDefault();
        const inputData = combineInputData();
        setSubmitButtonClicked(true);
        if (inputData.cv) {
            try {
                await axios({
                    method: "post",
                    url: vacancyURL + "applications/",
                    data: inputData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: "JWT " + localStorage.getItem("access_token")
                    }
                }
                );
                changeProfile({
                    ...profile,
                    justApplied: true
                })
                navigate("/my-profile/applications");
            } catch (error) {
                console.log(error);
            };
        } else { console.log("You should complete the required fields") };
    };

    return (
        <Container>
            <Typography
                level="h3"
                textAlign="center"
                sx={{ marginBottom: 1 }}
            >Apply for Vacancy:
            </Typography>
            <Typography
                level="h3"
                textAlign="center"
                sx={{ marginBottom: 5 }}
            >
                {vacancyData.title} at {vacancyData.company}
            </Typography>
            <form style={{ display: "flex", justifyContent: "center" }} onSubmit={handleApplicationSubmit}>
                <Stack sx={{ width: { xs: "70%", md: "60%" } }}>
                    <Typography color="danger" sx={{ marginBottom: 2 }}>
                        Mandatory fields are marked with asterisk (*)
                    </Typography>
                    <DisabledInputField
                        label="Your Name*"
                        placeholder={`${localStorage.getItem("first_name")} ${localStorage.getItem("last_name")}`} />
                    <FileUploadField
                        label="Your CV*"
                        name="cv"
                        onChange={handleFileUpload}
                        uploaded={filesUploaded.cv}
                        error={!userInputData.cv && !filesUploaded.cv && submitButtonClicked} />
                    <FileUploadField
                        label="Your Cover Letter"
                        name="coverLetter"
                        onChange={handleFileUpload}
                        uploaded={filesUploaded.coverLetter} />
                    <SubmitButton
                        label="APPLY"
                        sx={{
                            width: { xs: "50%", sm: "40%", md: "30%" },
                            marginTop: 5,
                            alignSelf: "center"
                        }} />
                </Stack>
            </form>
        </Container>
    );
};