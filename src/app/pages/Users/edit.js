import React, { useState } from "react";
import { Box } from "@mui/material";

import moment from "moment";

import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import CustomForm from "./form";
import { useNavigate, useParams } from "react-router-dom";
import Div from "@jumbo/shared/Div";
import { CircularProgress } from "@mui/material";
import useFetch from 'app/hooks/useFetch';

const EditUser = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const {
    isLoading: isLoadingDetail,
    data: userDetail,
    error: errorDetail,
  } = useFetch({
    url: `/users/detail/${params.id}`,
  });

  const onSubmitData = (payload) => {
    const temp = {
      ...payload,
      roles: payload.roles.value,
    };
    axiosFetch({
      method: "put",
      url: `/users/edit/${params.id}`,
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        props.snackbarShowMessage('Data pengguna berhasil diubah');
        setTimeout(() => navigate('/users'), 1500);
      },
    });
  };

  return (
    <Box>
      <Box p={5} mx={4}>
      {isLoadingDetail ? (
          <Div
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress sx={{ m: "-40px auto 0" }} />
          </Div>
        ) : (
          <CustomForm
            onSubmit={onSubmitData}
            isLoading={isLoading}
            isEdit={true}
            initialValues={{
              email: userDetail?.email ?? '',
              first_name: userDetail?.first_name ?? '',
              last_name: userDetail?.last_name ?? '',
              roles: { value: userDetail?.roles_id, label: userDetail?.roles_name },
              password: '',
              confirmPassword: '',
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default withSnackbar(EditUser);
