import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import useJumboAuth from '@jumbo/hooks/useJumboAuth';
import { useSnackbar } from 'notistack';

const baseAxios = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const AxiosInterceptor = ({ children }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { setAuthToken } = useJumboAuth();

  useEffect(() => {
    const resInterceptor = (response) => {
      if (typeof response?.data === 'object' && 'auth' in response?.data) {
        if (!response?.data?.auth) {
          enqueueSnackbar('Your session is expired. Redirecting you to login page.', {
            autoHideDuration: 2000,
            preventDuplicate: true,
            variant: 'error',
            onClose: () => {
                setAuthToken(null);
            }
          });
          return;
        }
      }
      return response;
    };

    const errInterceptor = (error) => {
      if (typeof error?.response?.data === 'object' && 'auth' in error?.response?.data) {
        if (!error?.response?.data?.auth) {
          enqueueSnackbar('Your session is expired. Redirecting you to login page.', {
            autoHideDuration: 2000,
            preventDuplicate: true,
            variant: 'error',
            onClose: () => {
              setAuthToken(null);
            }
          });
          return;
        }
      }
      enqueueSnackbar(error?.response?.data?.meta?.message ?? "Something went wrong", {
        autoHideDuration: 2500,
        variant: 'error'
      });
      return Promise.reject(error);
    };

    const interceptor = baseAxios.interceptors.response.use(resInterceptor, errInterceptor);
    return () => {
      baseAxios.interceptors.response.eject(interceptor);
    }
  }, []);

  return (
    <>
      {children}
    </>
  );
};

export default baseAxios;
export { AxiosInterceptor };
