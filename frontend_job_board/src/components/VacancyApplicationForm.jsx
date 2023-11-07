import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, Button, Stack } from "@mui/joy";
import { BASE_URL } from "../utils/config";
import { SelectField } from "./SelectField";
import { FileUploadField } from "./FileUploadField";

export const VacancyApplicationForm = props => {

    const allInputsNotFocused = {
        applicant: false,
        cv: false,
    };

    const [candidateId, setCandidateId] = useState(null);
    const [userInputData, setUserInputData] = useState({});
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
    const [inputsFocused, setInputsFocused] = useState(allInputsNotFocused);
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
    let vacancyURL = BASE_URL + `/vacancies/${vacancyId}`

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

    const combineInputData = () => {
        const inputDataObject = {
            vacancy: vacancyId,
            applicant: candidateId,
            cv: applicationFiles.cv,
            cover_letter: applicationFiles.coverLetter
        };
        setUserInputData(inputDataObject);
        return inputDataObject;
    }

    const handleApplicationSubmit = async event => {
        event.preventDefault();
        const inputData = combineInputData();
        console.log(inputData);
        setSubmitButtonClicked(true);
        setInputsFocused(allInputsNotFocused);
        if (
            inputData.applicant &&
            inputData.cv
        ) {
            try {
                await axios({
                    method: "post",
                    url: vacancyURL + "/applications/",
                    data: inputData,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
                );
                navigate(`/vacancies/${vacancyId}/applied`);
            } catch (error) {
                console.log(error);
            };
        } else { console.log("You should complete the required fields") };
    };

    let navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ marginY: 5 }}>
            <Typography
                level="h3"
                sx={{ marginBottom: 5 }}
            >Apply for Vacancy: {props.vacancyData.title} at {props.companies[props.vacancyData.company]}
            </Typography>
            <form onSubmit={handleApplicationSubmit}>
                <Stack>
                    {/* <InputField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            name: true
                        }))}
                        label="Your Name"
                        placeholder="Enter your full name"
                        name="name"
                        inputRef={applicationName}
                        error={!userInputData.name && !inputsFocused.name && submitButtonClicked} />
                    <InputField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            email: true
                        }))}
                        label="Your Email"
                        placeholder="Enter your email"
                        name="email"
                        type="email"
                        inputRef={applicationEmail}
                        error={!userInputData.email && !inputsFocused.email && submitButtonClicked} />
                    <InputField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            phone: true
                        }))}
                        label="Your Phone Number"
                        placeholder="Enter your phone"
                        name="phone"
                        type="tel"
                        maxLength="15"
                        pattern="\d*"
                        startDecorator="+"
                        onInvalid={e => e.target.setCustomValidity('This field should contain only numbers')}
                        inputRef={applicationPhone}
                        error={!userInputData.phone && !inputsFocused.phone && submitButtonClicked} /> */}
                    <SelectField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            applicant: true
                        }))}
                        label="Applicant"
                        name="applicant"
                        options={props.candidates}
                        onSelectItem={item => setCandidateId(item)}
                        error={!userInputData.applicant && !inputsFocused.applicant && submitButtonClicked} />
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