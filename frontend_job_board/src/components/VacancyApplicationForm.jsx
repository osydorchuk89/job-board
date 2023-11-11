import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import { Container, Typography, Button, Stack } from "@mui/joy";
import { BASE_URL } from "../utils/config";
import { DisabledInputField } from "./DisabledInputField";
import { FileUploadField } from "./FileUploadField";

export const VacancyApplicationForm = props => {

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
    let vacancyURL = BASE_URL + `api/vacancies/${vacancyId}`

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
        console.log(inputData);
        setSubmitButtonClicked(true);
        if (inputData.cv) {
            try {
                await axios({
                    method: "post",
                    url: vacancyURL + "/applications/",
                    data: inputData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: "JWT " + localStorage.getItem("access_token")
                    }
                }
                );
                navigate(`/vacancies/${vacancyId}/applied`);
            } catch (error) {
                console.log(error);
            };
        } else { console.log("You should complete the required fields") };
    };


    return (
        <Container maxWidth="md" sx={{ marginY: 5 }}>
            <Typography
                level="h3"
                sx={{ marginBottom: 5 }}
            >Apply for Vacancy: {props.vacancyData.title} at {props.vacancyData.company}
            </Typography>
            <form onSubmit={handleApplicationSubmit}>
                <Stack>
                    <DisabledInputField
                        label="Your Name"
                        placeholder={`${localStorage.getItem("first_name")} ${localStorage.getItem("last_name")}`} />
                    <FileUploadField
                        label="Your CV"
                        name="cv"
                        onChange={handleFileUpload}
                        uploaded={filesUploaded.cv}
                        error={!userInputData.cv && !filesUploaded.cv && submitButtonClicked} />
                    <FileUploadField
                        label="Your Cover Letter"
                        name="coverLetter"
                        onChange={handleFileUpload}
                        uploaded={filesUploaded.coverLetter} />
                    <Button
                        type="submit"
                        variant="solid"
                        color="success">SUBMIT YOUR APPLICATION</Button>
                </Stack>
            </form>
        </Container>
    );
};