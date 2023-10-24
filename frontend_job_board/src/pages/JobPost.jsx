import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Stack } from "@mui/material";
import { InputField } from "../components/InputField";
import { TextareaField } from "../components/TextareaField";
import { SelectField } from "../components/SelectField";
import { InputAddItems } from "../components/InputAddItems";
import { BASE_URL } from "../utils/config";

const employmentTypeOptions = [
    { value: "Full Time", text: "Full Time" },
    { value: "Part Time", text: "Part Time" },
    { value: "Contract", text: "Contract" },
    { value: "Temporary", text: "Temporary" },
    { value: "Freelance", text: "Freelance" },
    { value: "Internship", text: "Internship" },
];

const workModeOptions = [
    { value: "On-Site", text: "On-Site" },
    { value: "Remote", text: "Remote" },
    { value: "Hybrid", text: "Hybrid" },
    { value: "Flexible", text: "Flexible" },
];

export const JobPost = () => {

    const [userTitleInput, setUserTitleInput] = useState("");
    const [inputValid, setInputValid] = useState(true);
    const [keyResponsibilities, setKeyResponsibilities] = useState([]);
    const [qualifications, setQualifications] = useState([]);
    const [companyName, setCompanyName] = useState(null);
    const [employmentType, setEmploymentType] = useState(null);
    const [workMode, setWorkMode] = useState(null);
    const [companies, setCompanies] = useState([]);
    const inputVacancyData = useRef(null);

    let navigate = useNavigate();

    let getCompaniesURL = BASE_URL + "/companies/?fields=id,name";
    let postVacancyURL = BASE_URL + "/vacancies/";

    const fetchCompanies = async () => {
        try {
            const response = await axios.get(getCompaniesURL);
            const responseData = response.data;
            for (const companyData of responseData) {
                companyData["value"] = companyData["id"];
                companyData["text"] = companyData["name"];
                delete companyData["id"];
                delete companyData["name"];
            };
            setCompanies(responseData);
        } catch (error) {
            console.error(error);
        };
    };

    useEffect(() => async () => {
        fetchCompanies();
    }, []);

    const updateKeyResponsibilities = newItem => {
        setKeyResponsibilities(prevState => [
            ...prevState,
            newItem
        ]);
    };

    const updateQualifications = newItem => {
        setQualifications(prevState => [
            ...prevState,
            newItem
        ]);
    };

    const updateCompany = item => {
        setCompanyName(item);
    };

    const updateEmploymentType = item => {
        setEmploymentType(item);
    };

    const updateWorkMode = item => {
        setWorkMode(item);
    };

    const combineInputData = () => {
        const inputVacancyTitle = inputVacancyData.current["title"].value;
        const inputVacancyIndustry = inputVacancyData.current["industry"].value;
        const inputVacancyCountry = inputVacancyData.current["country"].value;
        const inputVacancyCity = inputVacancyData.current["city"].value;
        const inputVacancyAboutCompany = inputVacancyData.current["aboutCompany"].value;
        const inputVacancyPositionOverview = inputVacancyData.current["positionOverview"].value;
        const inputVacancySalary = inputVacancyData.current["salary"].value;
        const userInputData = {
            title: inputVacancyTitle,
            company: companyName,
            industry: inputVacancyIndustry,
            country: inputVacancyCountry,
            city: inputVacancyCity,
            about_company: inputVacancyAboutCompany,
            position_overview: inputVacancyPositionOverview,
            key_responsibilities: keyResponsibilities.slice(-1)[0].join("\r\n"),
            qualifications: qualifications.slice(-1)[0].join("\r\n"),
            salary: inputVacancySalary,
            employment_type: employmentType,
            work_mode: workMode
        };
        return userInputData;
    };

    const handleSubmitVacancy = async event => {
        event.preventDefault();
        const userInputData = combineInputData();
        try {
            await axios.post(postVacancyURL, userInputData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("Success!");
            navigate("/job-post/succesfully-posted");
        } catch (error) {
            console.log(error);
        };
    };

    const handleBlur = event => {
        setUserTitleInput(event.target.value);
        if (userTitleInput.length === 0) {
            setInputValid(false);
        } else {
            setInputValid(true);
        };
    };

    return (
        <Container maxWidth="md" sx={{ marginY: 5 }}>
            <Typography variant="h5" sx={{ marginBottom: 5 }}>Post a Vacancy</Typography>
            <form ref={inputVacancyData} onSubmit={handleSubmitVacancy}>
                <Stack>
                    <InputField
                        // onBlur={handleBlur}
                        error={!inputValid}
                        label="Vacancy Title"
                        placeholder="Enter vacancy title"
                        name="title" />
                    <SelectField
                        value="company"
                        label="Company"
                        placeholder="Enter company name"
                        options={companies}
                        onSelectItem={updateCompany} />
                    <InputField
                        label="Industry"
                        placeholder="Enter industry"
                        name="industry" />
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
                    <InputAddItems
                        label="Key Responsibilities"
                        placeholder="Enter key job responsibilities"
                        onAddItem={updateKeyResponsibilities} />
                    <InputAddItems
                        label="Qualifications"
                        placeholder="Enter qualifications"
                        onAddItem={updateQualifications} />
                    <InputField
                        label="Salary"
                        placeholder="Enter annual salary"
                        name="salary" />
                    <SelectField
                        value="employmentType"
                        label="Employment Type"
                        placeholder="Select employment type"
                        options={employmentTypeOptions}
                        onSelectItem={updateEmploymentType} />
                    <SelectField
                        value="workMode"
                        label="Work Mode"
                        placeholder="Select work mode"
                        options={workModeOptions}
                        onSelectItem={updateWorkMode} />
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        disableElevation
                    >POST VACANCY</Button>
                </Stack>
            </form>
        </Container>
    );
};