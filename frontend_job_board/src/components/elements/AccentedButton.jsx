import Button from '@mui/material/Button';

export const AccentedButton = props => {
    return (
        <Button size="large" variant="contained" color="success">{props.text}</Button>
    );
};