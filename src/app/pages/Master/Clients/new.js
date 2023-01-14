import React, { useState } from "react";
import { Box } from "@mui/material";

import moment from "moment";

import useAxiosFunction from "app/hooks/useAxiosFunction";
import CustomSnackbar from "app/components/CustomSnackbar";
import CustomForm from "./form";

const NewClient = () => {
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const [message, setMessage] = useState("");
  const [isOpenSnackbar, setOpenSnackbar] = useState(false);

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
        setMessage("Data client berhasil ditambahkan");
        setOpenSnackbar(true);
      },
    });
  };

  return (
    <Box>
      <CustomSnackbar
        isOpen={isOpenSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message={message}
        severity={error ? "error" : "success"}
      />
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
