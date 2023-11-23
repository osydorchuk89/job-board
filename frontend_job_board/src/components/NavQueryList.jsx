import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, Stack, Link } from "@mui/joy";
import { UserQueryContext } from "../store/UserQueryContext";

export const NavQueryList = props => {

    const { changeQuery } = useContext(UserQueryContext);
    const navigate = useNavigate();

    return (
        <Sheet sx={{ width: "100%", maxWidth: 360, bgcolor: "inherit" }}>
            <Stack spacing={1} alignItems={{ xs: "center", sm: "flex-start" }} >
                {props.listItems.map((item, index) =>
                    <Link
                        key={index}
                        onClick={event => {
                            event.preventDefault();
                            const userInputData = {
                                vacancyEmploymentType: item,
                            };
                            changeQuery(userInputData);
                            navigate("/vacancies");
                        }}
                        sx={{ color: "#FBFCFE", width: "fit-content" }}>{item}</Link>
                )}
            </Stack>
        </Sheet>
    );
};