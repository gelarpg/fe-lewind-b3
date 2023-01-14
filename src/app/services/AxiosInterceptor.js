import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useJumboAuth from '@jumbo/hooks/useJumboAuth';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const baseAxios = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AxiosInterceptor = ({ children }) => {
  const { setAuthToken } = useJumboAuth();
  const navigate = useNavigate();

  const [isOpen, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isExpired, setExpired] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if (isExpired) {
      setAuthToken(null);
      setExpired(false);
    }
    setOpen(false);
  };

  useEffect(() => {
    const resInterceptor = (response) => {
      if ('auth' in response?.data) {
        if (!response?.data?.auth) {
          setExpired(true);
          setMessage("Your session is expired. Redirecting you to login page.");
          setOpen(true);
          return;
        }
      }
      return response;
    };

    const errInterceptor = (error) => {
      // Swal.fire(error?.response?.data?.meta?.message ?? "Something went wrong");
      setOpen(true);
      setMessage(error?.response?.data?.meta?.message ?? "Something went wrong");
      return Promise.reject(error);
    };

    const interceptor = baseAxios.interceptors.response.use(resInterceptor, errInterceptor);

    return () => baseAxios.interceptors.response.eject(interceptor);
  }, [navigate]);

  return (
    <>
      <Snackbar
        open={isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </>
  );
};

export default baseAxios;
export { AxiosInterceptor };
