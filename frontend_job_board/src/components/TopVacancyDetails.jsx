import { useContext } from "react";
import { Stack, Typography, Chip, Link } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { UserQueryContext } from "../store/UserQueryContext";
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import WorkIcon from '@mui/icons-material/Work';

export const TopVacancyDetails = props => {

    const { changeQuery } = useContext(UserQueryContext);
    const navigate = useNavigate();

    window.onpopstate = () => {
        changeQuery({
            vacancyTitle: null,
            vacancyCompany: null,
            vacancyCity: null
        });
    };

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between">
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}>
                <BusinessIcon />
                <Typography>
                    <Link onClick={event => {
                        event.preventDefault();
                        const userInputData = {
                            vacancyCompany: props.company,
                        };
                        changeQuery(userInputData);
                        navigate("/vacancies");
                    }}>
                        {props.company}
                    </Link>
                </Typography>
            </Stack>
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                    display: { xs: "none", md: "flex" }
                }}>
                <WorkIcon />
                <Typography>{props.industry}</Typography>
            </Stack>
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                    display: { xs: "none", md: "flex" }
                }}>
                <LocationOnIcon />
                <Typography>
                    <Link onClick={event => {
                        event.preventDefault();
                        const userInputData = {
                            vacancyCity: props.city,
                        };
                        changeQuery(userInputData);
                        navigate("/vacancies");
                    }}>
                        {props.city}, {props.country}
                    </Link>
                </Typography>
            </Stack>
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                    display: { xs: "none", md: "flex" }
                }}>
                <LocalAtmIcon />
                <Typography>${props.salary.toLocaleString()}</Typography>
            </Stack>
            <Chip variant="outlined" size="lg">{props.employment_type}</Chip>
            <Chip variant="outlined" size="lg">{props.work_mode}</Chip>
        </Stack>
    );
};