import { useLoaderData, Link as RouterLink } from "react-router-dom";
import { List, ListItem, Link } from "@mui/joy";
import { BASE_URL } from "../utils/config";

export const SubmittedApplicationsDetails = () => {

    const applicationsData = useLoaderData();

    return (
        <>
            {applicationsData.map((application, index) => <List key={index}>
                <ListItem>{application.submission_date}</ListItem>
                <ListItem>
                    <Link component={RouterLink} to={`${BASE_URL.slice(0, -1)}${application.cv}`}>
                        Download CV
                    </Link>
                </ListItem>
            </List>)}
        </>
    )
}