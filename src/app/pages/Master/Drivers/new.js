import React, { useState } from 'react';
import { Box } from '@mui/material';
import useAxiosFunction from 'app/hooks/useAxiosFunction';
import CustomForm from './form';
import { withSnackbar } from "app/components/SnackbarComponent";
import { useNavigate } from "react-router-dom";
import { uploadFileHandler } from "app/utils/helpers";

const NewDriver = (props) => {
  const navigate = useNavigate();
  const { isLoading: isLoadingAPI, data, error, axiosFetch } = useAxiosFunction();

  const [isLoading, setLoading] = React.useState(false);

  const onSubmitData = (payload) => {
    const promises = [];
    const temp = {};
    temp.name = payload.name;
    temp.age = payload.age;
    temp.phone_number = payload.phone_number.replace(/\s+/g,"").replace(/_/g, "");
    temp.address = payload.address;

    if (payload.sim_file) {
      promises.push({
        key: "sim_file",
        payload: payload.sim_file,
      });
    }
    if (payload.ktp_file) {
      promises.push({
        key: "ktp_file",
        payload: payload.ktp_file,
      });
    }
    uploadFileHandler(promises).then((values) => {
      let dataToSend = {
        ...temp,
        ...values,
      };
      axiosFetch({
        method: 'post',
        url: '/driver/create',
        requestConfig: {
          data: dataToSend,
        },
        onSuccess: () => {
          props.snackbarShowMessage('Data driver berhasil ditambahkan');
          setTimeout(() => navigate('/drivers'), 1500);
        },
        finally: () => setLoading(false)
      });
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
              sim_file: null,
              ktp_file: null,
              sim_number: "",
              ktp_number: ""
            }}
          />
      </Box>
    </Box>
  );
};

export default withSnackbar(NewDriver);
