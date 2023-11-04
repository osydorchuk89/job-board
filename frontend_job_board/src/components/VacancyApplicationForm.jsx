import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, Button, Stack } from "@mui/joy";
import { BASE_URL } from "../utils/config";

import { InputField } from "../components/InputField";
import { FileUploadField } from "./FileUploadField";

export const VacancyApplicationForm = props => {

    const allInputsNotFocused = {
        name: false,
        email: false,
        phone: false,
        cv: false,
    };

    const [vacancyData, setVacancyData] = useState({});
    const [userInputData, setUserInputData] = useState({});
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
    const [inputsFocused, setInputsFocused] = useState(allInputsNotFocused);
    const [applicationFiles, setApplicationFiles] = useState({
        cv: null,
        coverLetter: null
    });

    const applicationName = useRef();
    const applicationEmail = useRef();
    const applicationPhone = useRef();

    const params = useParams();
    const vacancyId = params.vacancyId;
    const vacancyURL = BASE_URL + `/vacancies/${vacancyId}`

    const fetchVacancyTitle = async () => {
        try {
            const response = await axios.get(vacancyURL);
            setVacancyData({
                title: response.data.title,
                company: response.data.company
            });
        } catch (error) {
            console.error(error);
        };
    };

    useEffect(() => {
        fetchVacancyTitle();
    }, [])


    const handleFileUpload = event => {
        event.preventDefault();
        setApplicationFiles(prevState => ({
            ...prevState,
            [event.target.name]: event.target.files[0]
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();
        const inputDataObject = {
            name: applicationName.current.value.trim(),
            email: applicationEmail.current.value.trim(),
            phone: applicationPhone.current.value.trim(),
            cv: applicationFiles.cv,
            coverLetter: applicationFiles.coverLetter
        };
        setUserInputData(inputDataObject);
        console.log(inputDataObject);
        setSubmitButtonClicked(true);
        setInputsFocused(allInputsNotFocused);
        if (
            inputDataObject.name &&
            inputDataObject.email &&
            inputDataObject.phone &&
            inputDataObject.cv
        ) {
            console.log("Applied succesfully!")
        } else { console.log("You should complete the required fields") };
    };

    let navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ marginY: 5 }}>
            <Typography
                level="h3"
                sx={{ marginBottom: 5 }}
            >Apply for Vacancy: {vacancyData.title} at {props.companies[vacancyData.company]}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack>
                    <InputField
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
                        error={!userInputData.phone && !inputsFocused.phone && submitButtonClicked} />
                    <FileUploadField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            cv: true
                        }))}
                        label="Your CV"
                        name="cv"
                        onChange={handleFileUpload}
                        error={!userInputData.cv && !inputsFocused.cv && submitButtonClicked} />
                    <FileUploadField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            coverLetter: true
                        }))}
                        label="Your Cover Letter"
                        name="coverLetter"
                        onChange={handleFileUpload} />
                    <Button
                        type="submit"
                        variant="solid"
                        color="success">SUBMIT YOUR APPLICATION</Button>
                </Stack>
            </form>
        </Container>
    );
};