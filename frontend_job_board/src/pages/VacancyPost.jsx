import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Button, Stack } from "@mui/joy";
import { InputField } from "../components/InputField";
import { TextareaField } from "../components/TextareaField";
import { SelectField } from "../components/SelectField";
import { BASE_URL } from "../utils/config";
import { employmentTypeOptions, workModeOptions } from "../utils/data";

const allInputsNotFocused = {
    title: false,
    company: false,
    industry: false,
    employmentType: false,
    workMode: false,
    keyResponsibilities: false,
    qualifications: false
};

export const VacancyPost = props => {

    const [companyId, setCompanyId] = useState(null);
    const [employmentType, setEmploymentType] = useState(null);
    const [workMode, setWorkMode] = useState(null);
    const [userInputData, setUserInputData] = useState({});
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
    const [inputsFocused, setInputsFocused] = useState(allInputsNotFocused);
    const vacancyData = useRef(null);

    let navigate = useNavigate();

    const combineInputData = () => {
        const inputDataObject = {
            title: vacancyData.current["title"].value,
            company: companyId,
            industry: vacancyData.current["industry"].value,
            country: vacancyData.current["country"].value,
            city: vacancyData.current["city"].value,
            about_company: vacancyData.current["aboutCompany"].value,
            position_overview: vacancyData.current["positionOverview"].value,
            key_responsibilities: vacancyData.current["keyResponsibilities"].value,
            qualifications: vacancyData.current["qualifications"].value,
            salary: vacancyData.current["salary"].value,
            employment_type: employmentType,
            work_mode: workMode
        };
        setUserInputData(inputDataObject);
        return inputDataObject;
    };

    const handleSubmitVacancy = async event => {
        event.preventDefault();
        let postVacancyURL = BASE_URL + "/vacancies/";
        const inputData = combineInputData();
        console.log(inputData);
        setSubmitButtonClicked(true);
        setInputsFocused(allInputsNotFocused);
        console.log(inputData);
        if (
            inputData.title &&
            inputData.company &&
            inputData.industry &&
            inputData.employment_type &&
            inputData.work_mode &&
            inputData.key_responsibilities &&
            inputData.qualifications
        ) {
            try {
                await axios.post(postVacancyURL, inputData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                console.log("Success!");
                navigate("/vacancy-post/posted");
            } catch (error) {
                console.log(error);
            };
        } else { console.log("You should complete the required fields") };
    };

    return (
        <Container maxWidth="md" sx={{ marginY: 5 }}>
            <Typography level="h3" sx={{ marginBottom: 5 }}>Post a Vacancy</Typography>
            <form ref={vacancyData} onSubmit={handleSubmitVacancy}>
                <Stack>
                    <InputField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            title: true
                        }))}
                        label="Vacancy Title"
                        placeholder="Enter vacancy title"
                        name="title"
                        error={!userInputData.title && !inputsFocused.title && submitButtonClicked} />
                    <SelectField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            company: true
                        }))}
                        label="Company"
                        placeholder="Enter company name"
                        name="company"
                        options={props.companies}
                        onSelectItem={item => setCompanyId(item)}
                        error={!userInputData.company && !inputsFocused.company && submitButtonClicked} />
                    <InputField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            industry: true
                        }))}
                        label="Industry"
                        placeholder="Enter industry"
                        name="industry"
                        error={!userInputData.industry && !inputsFocused.industry && submitButtonClicked} />
                    <InputField
                        label="Country"
                        placeholder="Enter country"
                        name="country" />
                    <InputField
                        label="City"
                        placeholder="Enter city"
                        name="city" />
                    <TextareaField
                        label="About Company"
                        placeholder="Enter brief information abour company"
                        name="aboutCompany" />
                    <TextareaField
                        label="Position Overview"
                        placeholder="Enter position overview"
                        name="positionOverview" />
                    <InputField
                        label="Salary"
                        placeholder="Enter annual salary"
                        name="salary" />
                    <TextareaField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            keyResponsibilities: true
                        }))}
                        label="Key Responsibilities"
                        placeholder="Enter key job responsibilities"
                        name="keyResponsibilities"
                        error={!userInputData.key_responsibilities && !inputsFocused.keyResponsibilities && submitButtonClicked} />
                    <TextareaField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            qualifications: true
                        }))}
                        label="Qualifications"
                        placeholder="Enter qualifications"
                        name="qualifications"
                        error={!userInputData.qualifications && !inputsFocused.qualifications && submitButtonClicked} />
                    <SelectField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            employmentType: true
                        }))}
                        label="Employment Type"
                        placeholder="Select employment type"
                        options={employmentTypeOptions}
                        onSelectItem={item => setEmploymentType(item)}
                        error={!userInputData.employment_type && !inputsFocused.employmentType && submitButtonClicked} />
                    <SelectField
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            workMode: true
                        }))}
                        label="Work Mode"
                        placeholder="Select work mode"
                        options={workModeOptions}
                        onSelectItem={item => setWorkMode(item)}
                        error={!userInputData.work_mode && !inputsFocused.workMode && submitButtonClicked} />
                    <Button
                        type="submit"
                        variant="solid"
                        color="success">POST VACANCY</Button>
                </Stack>
            </form>
        </Container>
    );
};