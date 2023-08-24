import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

const ErrorComponent = ({ statusCode, errorMessage }) => {
    return (
        <Alert variant="danger">
            <Alert.Heading>Error {statusCode}</Alert.Heading>
            <p>{errorMessage}</p>
        </Alert>
    );
};

ErrorComponent.propTypes = {
  statusCode: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorComponent;
