import React from 'react';
import Alert from 'react-bootstrap/Alert';

const ErrorComponent = ({ statusCode, errorMessage }) => {
    return (
        <Alert variant="danger">
            <Alert.Heading>Error {statusCode}</Alert.Heading>
            <p>{errorMessage}</p>
        </Alert>
    );
};

export default ErrorComponent;