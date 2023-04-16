import React from "react";
import { Box } from "@mui/material";

import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import CustomForm from "./form";
import { useNavigate } from "react-router-dom";

const NewClient = (props) => {
  const navigate = useNavigate();
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const onSubmitData = (payload) => {
    const temp = {
      ...payload,
      waste_ids: payload.waste_ids.map(x => x.id.value)[0],
      transaction_fee: Number(payload.transaction_fee.replace(/[$.]+/g, '').replace(/[$,]+/g, '.')),
    };
    if (temp.waste_type) delete temp.waste_type;
    if (temp.price_per_unit) delete temp.price_per_unit;
    axiosFetch({
      method: "post",
      url: "/clients/create",
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        props.snackbarShowMessage('Data client berhasil ditambahkan');
        setTimeout(() => navigate('/clients'), 1500);
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
            waste_ids: [{
              id: null,
              name: "",
            }],
          }}
        />
      </Box>
    </Box>
  );
};

export default withSnackbar(NewClient);
