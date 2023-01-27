import React, { useState } from 'react';
import { Box } from '@mui/material';
import useAxiosFunction from 'app/hooks/useAxiosFunction';
import CustomForm from './form';
import useNotif from "app/hooks/useNotif";

const NewDriver = () => {
  const [notif, sendNotification] = useNotif();
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const onSubmitData = (payload) => {
    const temp = {
      ...payload,
    };
    axiosFetch({
      method: 'post',
      url: '/driver/create',
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        sendNotification({msg: 'Data driver berhasil ditambahkan', variant: 'success'});
      },
    });
  };

  return (
    <Box>
      <Box p={5} mx={4}>
          <CustomForm
            onSubmit={onSubmitData}
            isLoading={isLoading}
            initialValues={{
              name: "",
              age: "",
              phone_number: "",
              address: "",
            }}
          />
      </Box>
    </Box>
  );
};

export default NewDriver;
