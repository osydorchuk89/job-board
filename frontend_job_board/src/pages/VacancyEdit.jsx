import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export const VacancyEdit = ({ companies }) => {

    const [vacancyDetails, setVacancyDetails] = useState([]);
    const [companyId, setCompanyId] = useState(null);
    const [employmentType, setEmploymentType] = useState(null);
    const [workMode, setWorkMode] = useState(null);
    const [userInputData, setUserInputData] = useState({});
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
    const [inputsFocused, setInputsFocused] = useState(allInputsNotFocused);
    const vacancyData = useRef(null);

    const params = useParams();
    const vacancyId = params.vacancyId;
    let navigate = useNavigate();

    const fetchVacancyDetails = async () => {
        let vacancyURL = BASE_URL + `/vacancies/${vacancyId}`
        try {
            const response = await axios.get(vacancyURL);
            setVacancyDetails(response.data);
        } catch (error) {
            console.error(error);
        };
    };

    useEffect(() => {
        fetchVacancyDetails();
    }, []);

    const combineInputData = () => {
        const inputDataObject = {
            title: vacancyData.current["title"].value,
            company: companyId || vacancyDetails.company,
            industry: vacancyData.current["industry"].value,
            country: vacancyData.current["country"].value,
            city: vacancyData.current["city"].value,
            about_company: vacancyData.current["aboutCompany"].value,
            position_overview: vacancyData.current["positionOverview"].value,
            key_responsibilities: vacancyData.current["keyResponsibilities"].value,
            qualifications: vacancyData.current["qualifications"].value,
            salary: vacancyData.current["salary"].value,
            employment_type: employmentType || vacancyDetails.employment_type,
            work_mode: workMode || vacancyDetails.work_mode
        }
        setUserInputData(inputDataObject);
        return inputDataObject;
    };

    const handleSubmitVacancy = async event => {
        event.preventDefault();
        const inputData = combineInputData();
        setSubmitButtonClicked(true);
        setInputsFocused(allInputsNotFocused);
        let putVacancyURL = BASE_URL + "/vacancies/" + vacancyId + "/";
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
                await axios.put(putVacancyURL, inputData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                console.log("Successfulle updated!");
                navigate(`/vacancies/${vacancyId}/edit/updated`);
            } catch (error) {
                console.log(error);
            };
        } else { console.log("You should complete the required fields") };
    };

    console.log(companies);

    return (
        <Container maxWidth="md" sx={{ marginY: 5 }}>
            <Typography level="h3" sx={{ marginBottom: 5 }}>Edit Vacancy</Typography>
            <form ref={vacancyData} onSubmit={handleSubmitVacancy}>
                {vacancyDetails.company &&
                    < Stack >
                        <InputField
                            defaultValue={vacancyDetails.title}
                            onFocus={() => setInputsFocused(prevState => ({
                                ...prevState,
                                title: true
                            }))}
                            label="Vacancy Title"
                            placeholder="Enter vacancy title"
                            name="title"
                            error={!userInputData.title && !inputsFocused.title && submitButtonClicked} />
                        <SelectField
                            defaultValue={vacancyDetails.company.toString()}
                            onFocus={() => setInputsFocused(prevState => ({
                                ...prevState,
                                company: true
                            }))}
                            label="Company"
                            placeholder="Enter company name"
                            options={companies}
                            onSelectItem={item => setCompanyId(item)}
                            error={!userInputData.company && !inputsFocused.company && submitButtonClicked} />
                        <InputField
                            defaultValue={vacancyDetails.industry}
                            onFocus={() => setInputsFocused(prevState => ({
                                ...prevState,
                                industry: true
                            }))}
                            label="Industry"
                            placeholder="Enter industry"
                            name="industry"
                            error={!userInputData.industry && !inputsFocused.industry && submitButtonClicked} />
                        <InputField
                            defaultValue={vacancyDetails.country}
                            label="Country"
                            placeholder="Enter country"
                            name="country" />
                        <InputField
                            defaultValue={vacancyDetails.city}
                            label="City"
                            placeholder="Enter city"
                            name="city" />
                        <TextareaField
                            defaultValue={vacancyDetails.about_company}
                            label="About Company"
                            placeholder="Enter brief information abour company"
                            name="aboutCompany" />
                        <TextareaField
                            defaultValue={vacancyDetails.position_overview}
                            label="Position Overview"
                            placeholder="Enter position overview"
                            name="positionOverview" />
                        <InputField
                            defaultValue={vacancyDetails.salary}
                            label="Salary"
                            placeholder="Enter annual salary"
                            name="salary" />
                        <TextareaField
                            defaultValue={vacancyDetails.key_responsibilities}
                            onFocus={() => setInputsFocused(prevState => ({
                                ...prevState,
                                keyResponsibilities: true
                            }))}
                            label="Key Responsibilities"
                            placeholder="Enter key job responsibilities"
                            name="keyResponsibilities"
                            error={!userInputData.key_responsibilities && !inputsFocused.keyResponsibilities && submitButtonClicked} />
                        <TextareaField
                            defaultValue={vacancyDetails.qualifications}
                            onFocus={() => setInputsFocused(prevState => ({
                                ...prevState,
                                qualifications: true
                            }))}
                            label="Qualifications"
                            placeholder="Enter qualifications"
                            name="qualifications"
                            error={!userInputData.qualifications && !inputsFocused.qualifications && submitButtonClicked} />
                        <SelectField
                            defaultValue={vacancyDetails.employment_type}
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
                            defaultValue={vacancyDetails.work_mode}
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
                            color="success">EDIT VACANCY</Button>
                    </Stack>}

            </form>
        </Container >
    );
};