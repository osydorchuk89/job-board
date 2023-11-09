import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Stack } from "@mui/joy";
import { InputField } from "../components/InputField";
import { TextareaField } from "../components/TextareaField";
import { SelectField } from "../components/SelectField";
import { employmentTypeOptions, workModeOptions } from "../store/data";

export const VacancyPostForm = props => {

    const allInputsNotFocused = {
        title: false,
        company: false,
        country: false,
        city: false,
        aboutCompany: false,
        positionOverview: false,
        industry: false,
        employmentType: false,
        workMode: false,
        keyResponsibilities: false,
        qualifications: false,
        salary: false
    };

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
            title: vacancyData.current["title"].value.trim(),
            company: companyId || props.defaultValues.company,
            industry: vacancyData.current["industry"].value.trim(),
            country: vacancyData.current["country"].value.trim(),
            city: vacancyData.current["city"].value.trim(),
            about_company: vacancyData.current["aboutCompany"].value.trim(),
            position_overview: vacancyData.current["positionOverview"].value.trim(),
            key_responsibilities: vacancyData.current["keyResponsibilities"].value.trim(),
            qualifications: vacancyData.current["qualifications"].value.trim(),
            salary: vacancyData.current["salary"].value.trim(),
            employment_type: employmentType || props.defaultValues.employment_type,
            work_mode: workMode || props.defaultValues.work_mode
        }
        setUserInputData(inputDataObject);
        return inputDataObject;
    };

    const handleSubmitVacancy = async event => {
        event.preventDefault();
        const inputData = combineInputData();
        console.log(inputData);
        setSubmitButtonClicked(true);
        setInputsFocused(allInputsNotFocused);
        if (
            inputData.title &&
            inputData.company &&
            inputData.industry &&
            inputData.country &&
            inputData.city &&
            inputData.about_company &&
            inputData.position_overview &&
            inputData.salary &&
            inputData.employment_type &&
            inputData.work_mode &&
            inputData.key_responsibilities &&
            inputData.qualifications
        ) {
            try {
                await axios({
                    method: props.method,
                    url: props.url,
                    data: inputData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: localStorage.getItem("access_token")
                            ? "JWT " + localStorage.getItem("access_token")
                            : null,
                    }
                });
                navigate(props.navigateUrl);
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
                        defaultValue={props.defaultValues.title}
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            title: true
                        }))}
                        label="Vacancy Title"
                        placeholder="Enter vacancy title"
                        name="title"
                        error={!userInputData.title && !inputsFocused.title && submitButtonClicked} />
                    <SelectField
                        defaultValue={props.defaultValues.company.toString()}
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
                        defaultValue={props.defaultValues.industry}
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            industry: true
                        }))}
                        label="Industry"
                        placeholder="Enter industry"
                        name="industry"
                        error={!userInputData.industry && !inputsFocused.industry && submitButtonClicked} />
                    <InputField
                        defaultValue={props.defaultValues.country}
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            country: true
                        }))}
                        label="Country"
                        placeholder="Enter country"
                        name="country"
                        error={!userInputData.country && !inputsFocused.country && submitButtonClicked} />
                    <InputField
                        defaultValue={props.defaultValues.city}
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            city: true
                        }))}
                        label="City"
                        placeholder="Enter city"
                        name="city"
                        error={!userInputData.city && !inputsFocused.city && submitButtonClicked} />
                    <TextareaField
                        defaultValue={props.defaultValues.about_company}
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            aboutCompany: true
                        }))}
                        label="About Company"
                        placeholder="Enter brief information abour company"
                        name="aboutCompany"
                        error={!userInputData.about_company && !inputsFocused.aboutCompany && submitButtonClicked} />
                    <TextareaField
                        defaultValue={props.defaultValues.position_overview}
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            positionOverview: true
                        }))}
                        label="Position Overview"
                        placeholder="Enter position overview"
                        name="positionOverview"
                        error={!userInputData.position_overview && !inputsFocused.positionOverview && submitButtonClicked} />
                    <InputField
                        defaultValue={props.defaultValues.salary}
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            salary: true
                        }))}
                        label="Salary"
                        placeholder="Enter annual salary"
                        name="salary"
                        type="number"
                        min="1000"
                        error={!userInputData.salary && !inputsFocused.salary && submitButtonClicked} />
                    <TextareaField
                        defaultValue={props.defaultValues.key_responsibilities}
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            keyResponsibilities: true
                        }))}
                        label="Key Responsibilities"
                        placeholder="Enter key job responsibilities"
                        name="keyResponsibilities"
                        error={!userInputData.key_responsibilities && !inputsFocused.keyResponsibilities && submitButtonClicked} />
                    <TextareaField
                        defaultValue={props.defaultValues.qualifications}
                        onFocus={() => setInputsFocused(prevState => ({
                            ...prevState,
                            qualifications: true
                        }))}
                        label="Qualifications"
                        placeholder="Enter qualifications"
                        name="qualifications"
                        error={!userInputData.qualifications && !inputsFocused.qualifications && submitButtonClicked} />
                    <SelectField
                        defaultValue={props.defaultValues.employment_type}
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
                        defaultValue={props.defaultValues.work_mode}
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
                        color="success">{props.buttonText}</Button>
                </Stack>
            </form>
        </Container>
    );
};