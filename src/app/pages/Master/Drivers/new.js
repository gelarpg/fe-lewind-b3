import React, { useState } from 'react';
import { Box } from '@mui/material';
import useAxiosFunction from 'app/hooks/useAxiosFunction';
import CustomForm from './form';
import { withSnackbar } from "app/components/SnackbarComponent";

const NewDriver = (props) => {
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const onSubmitData = (payload) => {
    const temp = {
      ...payload,
    };
    console.log(payload)
    // axiosFetch({
    //   method: 'post',
    //   url: '/driver/create',
    //   requestConfig: {
    //     data: temp,
    //   },
    //   onSuccess: () => {
    //     props.snackbarShowMessage('Data driver berhasil ditambahkan');
    //   },
    // });
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
              pdf_no_stnk: null,
              pdf_surat_jalan: null
            }}
          />
      </Box>
    </Box>
  );
};

export default withSnackbar(NewDriver);
