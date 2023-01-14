import React, { useEffect, useState } from 'react';
import baseAxios from 'app/services/AxiosInterceptor';
import useIsFirstRender from './useIsFirstRender';

const useFetch = (configObject) => {
  const { axiosInstance = baseAxios, method, url, requestConfig = {} } = configObject;

  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [config, setConfig] = useState(requestConfig);

  const isFirst = useIsFirstRender();

  const controller = new AbortController();

  const refetch = (newConfig) => {
    setConfig((curr) => ({ ...curr, ...newConfig }));
  };

  const fetch = async () => {
    setLoading(true);
    try {
      const { data: response } = await axiosInstance[method.toLowerCase()](url, {
        ...config,
        signal: controller.signal,
      });
      if (response?.meta?.success) {
        setData(response.data);
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.meta?.message ?? error?.response?.data?.message ?? 'Something went wrong';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isFirst) {
      fetch();
    }
    return () => controller.abort();
  }, [config]);

  return { data, isLoading, error, refetch };
};

export default useFetch;
