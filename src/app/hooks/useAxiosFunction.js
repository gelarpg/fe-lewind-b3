import React, { useEffect, useState } from 'react';
import baseAxios from 'app/services/AxiosInterceptor';

const useAxiosFunction = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);

  const axiosFetch = async (configObject) => {
    const {
      axiosInstance = baseAxios,
      method,
      url,
      requestConfig = {},
      onSuccess = null,
      onFailure = null,
    } = configObject;
    try {
      setLoading(true);

      const ctrl = new AbortController();
      setController(ctrl);

      let response = {};
      if (method.toLowerCase() === 'post') {
        const {
          data: dataToSend,
          ...rest
        } = requestConfig;
        const { data: responseTemp } = await axiosInstance.post(url, dataToSend, {
          ...rest,
          signal: ctrl.signal,
        });
        response = responseTemp;
      } else {
        const { data: responseTemp } = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: ctrl.signal,
        });
        response = responseTemp;
      }
      if (response?.meta?.success) {
        setData(response.data);
        if (onSuccess) onSuccess(response.data)
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.meta?.message ?? error?.response?.data?.message ?? 'Something went wrong';
      setError(errorMessage);
      if (onFailure) onFailure(errorMessage)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => controller && controller.abort();
  }, [controller]);

  return { data, isLoading, error, axiosFetch };
};

export default useAxiosFunction;
