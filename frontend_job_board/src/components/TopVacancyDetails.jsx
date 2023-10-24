import { Stack, Typography, Chip } from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import WorkIcon from '@mui/icons-material/Work';

export const TopVacancyDetails = props => {
    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={1}>
                <BusinessIcon />
                <Typography>{props.company}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
                <WorkIcon />
                <Typography>{props.industry}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
                <LocationOnIcon />
                <Typography>{props.city}, {props.country}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
                <LocalAtmIcon />
                <Typography>${props.salary}</Typography>
            </Stack>
            <Chip label={props.employment_type} />
            <Chip label={props.work_mode} />
        </Stack>
    );
};