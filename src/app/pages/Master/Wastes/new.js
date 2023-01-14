import React, { useState } from "react";
import { Box } from "@mui/material";

import moment from "moment";

import useAxiosFunction from "app/hooks/useAxiosFunction";
import CustomSnackbar from "app/components/CustomSnackbar";
import CustomForm from "./form";

const NewWaste = () => {
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const [message, setMessage] = useState("");
  const [isOpenSnackbar, setOpenSnackbar] = useState(false);

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
        setMessage("Data limbah berhasil ditambahkan");
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
