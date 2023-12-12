import axios from "axios";
import { useRef, useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Stack, Typography } from "@mui/joy";
import { InputField } from "../components/InputField";
import { TextareaField } from "../components/TextareaField";
import { SelectField } from "../components/SelectField";
import { DisabledInputField } from "./DisabledInputField";
import { SubmitButton } from "./SubmitButton";
import { employmentTypeOptions, workModeOptions } from "../store/data";
import { ProfileContext } from "../store/ProfileContext";
import { UserQueryContext } from "../store/UserQueryContext";

export const VacancyPostForm = props => {

    const location = useLocation();

    const { changeQuery } = useContext(UserQueryContext);
    const { profile, changeProfile } = useContext(ProfileContext);

    const allInputsNotFocused = {
        title: false,
        country: false,
        city: false,
        aboutCompany: false,
        positionOverview: false,
        industry: false,
        employmentType: false,
        workMode: false,
        responsibilities: false,
        qualifications: false,
        salary: false
    };

    const [employmentType, setEmploymentType] = useState(null);
    const [workMode, setWorkMode] = useState(null);
    const [userInputData, setUserInputData] = useState({});
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
    const [inputsFocused, setInputsFocused] = useState(allInputsNotFocused);
    const vacancyData = useRef();

    useEffect(() => {
        setSubmitButtonClicked(false);
        setUserInputData({});
        vacancyData.current.reset();
    }, [location]);

    let navigate = useNavigate();

    const combineInputData = () => {
        const inputDataObject = {
            title: vacancyData.current["title"].value.trim(),
            recruiter: localStorage.getItem("profile_id"),
            industry: vacancyData.current["industry"].value.trim(),
            country: vacancyData.current["country"].value.trim(),
            city: vacancyData.current["city"].value.trim(),
            about_company: vacancyData.current["aboutCompany"].value.trim(),
            position_overview: vacancyData.current["positionOverview"].value.trim(),
            responsibilities: vacancyData.current["responsibilities"].value.trim(),
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
        setSubmitButtonClicked(true);
        setInputsFocused(allInputsNotFocused);
        if (
            inputData.title &&
            inputData.industry &&
            inputData.country &&
            inputData.city &&
            inputData.about_company &&
            inputData.position_overview &&
            inputData.salary &&
            inputData.employment_type &&
            inputData.work_mode &&
            inputData.responsibilities &&
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
                changeProfile({
                    ...profile,
                    [props.action]: true
                });
                changeQuery({
                    vacancyRecruiter: inputData.recruiter,
                });
                navigate("/vacancies");
            } catch (error) {
                console.log(error);
            };
        } else { console.log("You should complete the required fields") };
    };

    return (
        <form
            style={{
                display: "flex",
                justifyContent: "center"
            }}
            ref={vacancyData}
            onSubmit={handleSubmitVacancy}>
            <Stack sx={{ width: { xs: "100%", sm: "90%", md: "80%" } }}>
                <Typography color="danger" sx={{ marginBottom: 2 }}>
                    Mandatory fields are marked with asterisk (*)
                </Typography>
                <InputField
                    defaultValue={props.defaultValues.title}
                    onFocus={() => setInputsFocused(prevState => ({
                        ...prevState,
                        title: true
                    }))}
                    label="Vacancy Title*"
                    placeholder="Enter vacancy title"
                    name="title"
                    fieldIsEmpty={!userInputData.title}
                    error={!userInputData.title && !inputsFocused.title && submitButtonClicked} />
                <DisabledInputField
                    label="Compane Name*"
                    placeholder={localStorage.getItem("company")} />
                <InputField
                    defaultValue={props.defaultValues.industry}
                    onFocus={() => setInputsFocused(prevState => ({
                        ...prevState,
                        industry: true
                    }))}
                    label="Industry*"
                    placeholder="Enter industry"
                    name="industry"
                    fieldIsEmpty={!userInputData.industry}
                    error={!userInputData.industry && !inputsFocused.industry && submitButtonClicked} />
                <InputField
                    defaultValue={props.defaultValues.country}
                    onFocus={() => setInputsFocused(prevState => ({
                        ...prevState,
                        country: true
                    }))}
                    label="Country*"
                    placeholder="Enter country"
                    name="country"
                    fieldIsEmpty={!userInputData.country}
                    error={!userInputData.country && !inputsFocused.country && submitButtonClicked} />
                <InputField
                    defaultValue={props.defaultValues.city}
                    onFocus={() => setInputsFocused(prevState => ({
                        ...prevState,
                        city: true
                    }))}
                    label="City*"
                    placeholder="Enter city"
                    name="city"
                    fieldIsEmpty={!userInputData.city}
                    error={!userInputData.city && !inputsFocused.city && submitButtonClicked} />
                <TextareaField
                    defaultValue={props.defaultValues.about_company}
                    onFocus={() => setInputsFocused(prevState => ({
                        ...prevState,
                        aboutCompany: true
                    }))}
                    label="About Company*"
                    placeholder="Enter brief information abour company"
                    name="aboutCompany"
                    fieldIsEmpty={!userInputData.about_company}
                    error={!userInputData.about_company && !inputsFocused.aboutCompany && submitButtonClicked} />
                <TextareaField
                    defaultValue={props.defaultValues.position_overview}
                    onFocus={() => setInputsFocused(prevState => ({
                        ...prevState,
                        positionOverview: true
                    }))}
                    label="Position Overview*"
                    placeholder="Enter position overview"
                    name="positionOverview"
                    fieldIsEmpty={!userInputData.position_overview}
                    error={!userInputData.position_overview && !inputsFocused.positionOverview && submitButtonClicked} />
                <InputField
                    defaultValue={props.defaultValues.salary}
                    onFocus={() => setInputsFocused(prevState => ({
                        ...prevState,
                        salary: true
                    }))}
                    label="Salary*"
                    placeholder="Enter annual salary"
                    name="salary"
                    type="number"
                    min="0"
                    fieldIsEmpty={!userInputData.salary}
                    error={!userInputData.salary && !inputsFocused.salary && submitButtonClicked} />
                <TextareaField
                    defaultValue={props.defaultValues.responsibilities}
                    onFocus={() => setInputsFocused(prevState => ({
                        ...prevState,
                        responsibilities: true
                    }))}
                    label="Key Responsibilities*"
                    placeholder="Enter key job responsibilities"
                    name="responsibilities"
                    fieldIsEmpty={!userInputData.responsibilities}
                    error={!userInputData.responsibilities && !inputsFocused.responsibilities && submitButtonClicked} />
                <TextareaField
                    defaultValue={props.defaultValues.qualifications}
                    onFocus={() => setInputsFocused(prevState => ({
                        ...prevState,
                        qualifications: true
                    }))}
                    label="Qualifications*"
                    placeholder="Enter qualifications"
                    name="qualifications"
                    fieldIsEmpty={!userInputData.qualifications}
                    error={!userInputData.qualifications && !inputsFocused.qualifications && submitButtonClicked} />
                <SelectField
                    defaultValue={props.defaultValues.employment_type}
                    onFocus={() => setInputsFocused(prevState => ({
                        ...prevState,
                        employmentType: true
                    }))}
                    label="Employment Type*"
                    placeholder="Select employment type"
                    options={employmentTypeOptions}
                    onSelectItem={item => setEmploymentType(item)}
                    fieldIsEmpty={!userInputData.employment_type}
                    error={!userInputData.employment_type && !inputsFocused.employmentType && submitButtonClicked} />
                <SelectField
                    defaultValue={props.defaultValues.work_mode}
                    onFocus={() => setInputsFocused(prevState => ({
                        ...prevState,
                        workMode: true
                    }))}
                    label="Work Mode*"
                    placeholder="Select work mode"
                    options={workModeOptions}
                    onSelectItem={item => setWorkMode(item)}
                    fieldIsEmpty={!userInputData.work_mode}
                    error={!userInputData.work_mode && !inputsFocused.workMode && submitButtonClicked} />
                <SubmitButton
                    label={props.buttonText}
                    sx={{
                        width: { xs: "50%", sm: "40%", md: "30%" },
                        marginTop: 5,
                        alignSelf: "center"
                    }} />
            </Stack>
        </form>
    );
};