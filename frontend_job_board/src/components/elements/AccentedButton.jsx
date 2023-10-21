import Button from '@mui/material/Button';

export const AccentedButton = props => {
    return (
        <Button type={props.type} href={props.href} size="large" variant="contained" color="success">{props.text}</Button>
    );
};