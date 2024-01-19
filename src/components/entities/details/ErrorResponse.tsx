import {
    Box,
    Card
} from '@material-ui/core';

const ErrorResponse = (props) => {
    return (
        <Box sx={{ mt: 3 }}>
            <Card className="errorMessage" sx={{ minHeight: 366 }}>
                <h2>{props.error}</h2>
            </Card>
        </Box>

    );
};
export default ErrorResponse;