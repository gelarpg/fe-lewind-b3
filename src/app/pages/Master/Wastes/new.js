import React, { useState } from "react";
import { Box } from "@mui/material";

import moment from "moment";

import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import CustomForm from "./form";
import { useNavigate } from "react-router-dom";

const NewWaste = (props) => {
  const navigate = useNavigate();
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const onSubmitData = (payload) => {
    const temp = {
      ...payload,
      // price_unit: Number(payload.price_unit.replace(/[$.]+/g, '').replace(/[$,]+/g, '.')),
      type: payload.type.value
    };
    axiosFetch({
      method: "post",
      url: "/waste/create",
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        props.snackbarShowMessage('Data limbah berhasil ditambahkan');
        setTimeout(() => navigate('/wastes'), 1500);
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
            type: null,
            weight_unit: "",
            // price_unit: "",
          }}
        />
      </Box>
    </Box>
  );
};

export default withSnackbar(NewWaste);
