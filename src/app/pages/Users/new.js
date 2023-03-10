import React, { useState } from "react";
import { Box } from "@mui/material";

import moment from "moment";

import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import CustomForm from "./form";
import { useNavigate } from "react-router-dom";

const NewUser = (props) => {
  const navigate = useNavigate();
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const onSubmitData = (payload) => {
    const temp = {
      ...payload,
      roles: payload.roles.value,
    };
    axiosFetch({
      method: "post",
      url: "/users/create",
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        props.snackbarShowMessage('Data pengguna berhasil ditambahkan');
        setTimeout(() => navigate('/users'), 1500);
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
            email: '',
            first_name: '',
            last_name: '',
            roles: null,
            password: '',
            confirmPassword: '',
          }}
        />
      </Box>
    </Box>
  );
};

export default withSnackbar(NewUser);
