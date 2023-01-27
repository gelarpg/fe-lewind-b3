import React from "react";
import { Box } from "@mui/material";

import useAxiosFunction from "app/hooks/useAxiosFunction";
import useNotif from "app/hooks/useNotif";
import CustomForm from "./form";

const NewClient = () => {
  const [notif, sendNotification] = useNotif();
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const onSubmitData = (payload) => {
    const temp = {
      ...payload,
      transaction_fee: Number(payload.transaction_fee.replace(/[$.]+/g, '').replace(/[$,]+/g, '.')),
    };
    axiosFetch({
      method: "post",
      url: "/waste/create",
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        sendNotification({msg: 'Data client berhasil ditambahkan', variant: 'success'});
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
            address: "",
            offer_number: "",
            transaction_fee: "",
          }}
        />
      </Box>
    </Box>
  );
};

export default NewClient;
