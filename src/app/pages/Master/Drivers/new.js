import React, { useState } from 'react';
import { Box } from '@mui/material';
import useAxiosFunction from 'app/hooks/useAxiosFunction';
import CustomForm from './form';
import { withSnackbar } from "app/components/SnackbarComponent";
import { useNavigate } from "react-router-dom";

const NewDriver = (props) => {
  const navigate = useNavigate();
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const onSubmitData = (payload) => {
    const temp = {};
    temp.name = payload.name;
    temp.age = payload.age;
    temp.phone_number = payload.phone_number.replace(/\s+/g,"").replace(/_/g, "");
    temp.address = payload.address;

    axiosFetch({
      method: 'post',
      url: '/driver/create',
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        props.snackbarShowMessage('Data driver berhasil ditambahkan');
        navigate('/drivers');
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
              // pdf_no_stnk: null,
              // pdf_surat_jalan: null
            }}
          />
      </Box>
    </Box>
  );
};

export default withSnackbar(NewDriver);
