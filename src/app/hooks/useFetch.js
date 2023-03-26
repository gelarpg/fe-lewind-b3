import React, { useEffect, useState } from 'react';
import baseAxios from 'app/services/AxiosInterceptor';
import axios from 'axios';
import usePrevious from './usePrevious';
import {isEqual, isEmpty} from 'lodash';
import useJumboAuth from "@jumbo/hooks/useJumboAuth";

const useFetch = (configObject) => {
  const { authUser } = useJumboAuth();
  const { axiosInstance = baseAxios, url, requestConfig = {} } = configObject;

  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [config, setConfig] = useState({});

  const prevConfig = usePrevious(config)

  const refetch = (newConfig) => {
    setConfig((curr) => ({ ...curr, ...newConfig }));
  };

  const fetch = async (configOptions, source, isMounted) => {
    if (isMounted && !isEmpty(authUser)) {
      setLoading(true);
      try {
        const { data: response } = await axiosInstance.get(url, {
          ...configOptions,
          cancelToken: source.token,
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
    }
  };

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    fetch(requestConfig, source, isMounted);
    return () => {
      isMounted = false;
      source.cancel();
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    if (!isEmpty(config)) {
      fetch(config, source, isMounted);
    }
    return () => {
      isMounted = false;
      source.cancel();
    }
  }, [config]);

  return { data, isLoading, error, refetch };
};

export default useFetch;
