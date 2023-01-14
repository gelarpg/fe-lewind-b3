import * as React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar = ({
  isOpen,
  onClose,
  severity,
  message
}) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

CustomSnackbar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.oneOf(['error', 'success', 'warning', 'info']),
};
CustomSnackbar.defaultProps = {
  severity: 'success'
}

export default CustomSnackbar;