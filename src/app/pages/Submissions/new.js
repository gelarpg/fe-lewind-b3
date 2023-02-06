import React, { useState } from "react";
import { Box } from "@mui/material";

import moment from "moment";

import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import CustomForm from "./form";

const NewSubmission = (props) => {
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const onSubmitData = (payload) => {
    const temp = {
      ...payload,
      price_unit: Number(payload.price_unit.replace(/[$.]+/g, '').replace(/[$,]+/g, '.')),
    };
    axiosFetch({
      method: "post",
      url: "/submission/create",
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        props.snackbarShowMessage('Data pengajuan berhasil ditambahkan');
      },
    });
  };

  return (
    <Box>
      <Box p={3}>
        <CustomForm
          onSubmit={onSubmitData}
          isLoading={isLoading}
          initialValues={{
            name: "",
            type: "",
            weight_unit: "",
            price_unit: "",
          }}
        />
      </Box>
    </Box>
  );
};

export default withSnackbar(NewSubmission);
