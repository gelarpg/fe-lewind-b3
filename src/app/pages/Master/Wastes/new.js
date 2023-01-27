import React, { useState } from "react";
import { Box } from "@mui/material";

import moment from "moment";

import useAxiosFunction from "app/hooks/useAxiosFunction";
import useNotif from "app/hooks/useNotif";
import CustomForm from "./form";

const NewWaste = () => {
  const [notif, sendNotification] = useNotif();
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const onSubmitData = (payload) => {
    const temp = {
      ...payload,
      price_unit: Number(payload.price_unit.replace(/[$.]+/g, '').replace(/[$,]+/g, '.')),
    };
    axiosFetch({
      method: "post",
      url: "/waste/create",
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        sendNotification({msg: 'Data limbah berhasil ditambahkan', variant: 'success'});
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
            type: "",
            weight_unit: "",
            price_unit: "",
          }}
        />
      </Box>
    </Box>
  );
};

export default NewWaste;
