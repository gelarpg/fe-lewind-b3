import React, { useState } from "react";
import { Box } from "@mui/material";

import moment from "moment";

import useAxiosFunction from "app/hooks/useAxiosFunction";
import useNotif from "app/hooks/useNotif";
import CustomForm from "./form";

const NewVehicle = () => {
  const [notif, sendNotification] = useNotif();
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const onSubmitData = (payload) => {
    const temp = {
      ...payload,
      transportation_type_id: payload.transportation_type_id.value,
    };
    axiosFetch({
      method: "post",
      url: "/transportation/create",
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        sendNotification({msg: 'Data kendaraan berhasil ditambahkan', variant: 'success'});
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
            fuel_type: "",
            transportation_type_id: null,
          }}
        />
      </Box>
    </Box>
  );
};

export default NewVehicle;
