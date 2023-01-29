import React, { useState } from "react";
import { Box } from "@mui/material";

import moment from "moment";

import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import CustomForm from "./form";

const NewVehicle = (props) => {
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const onSubmitData = (payload) => {
    const temp = {
      ...payload,
      transportation_type_id: payload.transportation_type_id.value,
      fuel_type: payload.fuel_type.value,
    };
    axiosFetch({
      method: "post",
      url: "/transportation/create",
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        props.snackbarShowMessage('Data kendaraan berhasil ditambahkan');
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
            no_police: "",
            year: "",
            capacity: "",
            fuel_type: null,
            transportation_type_id: null,
          }}
        />
      </Box>
    </Box>
  );
};

export default withSnackbar(NewVehicle);
