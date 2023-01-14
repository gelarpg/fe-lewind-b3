import React, { useState } from "react";
import { Box } from "@mui/material";

import moment from "moment";

import useAxiosFunction from "app/hooks/useAxiosFunction";
import CustomSnackbar from "app/components/CustomSnackbar";
import CustomForm from "./form";

const NewVehicle = () => {
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const [message, setMessage] = useState("");
  const [isOpenSnackbar, setOpenSnackbar] = useState(false);

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
        setMessage("Data kendaraan berhasil ditambahkan");
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
