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
      waste: payload.waste_ids.map(x => ({ id: x.id.value, waste_cost: Number(x.waste_cost.replace(/[$.]+/g, '').replace(/[$,]+/g, '.')) })),
      transaction_fee: Number(payload.transaction_fee.replace(/[$.]+/g, '').replace(/[$,]+/g, '.')),
    };
    if (temp.waste_ids) delete temp.waste_ids;
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
              waste_cost: ""
            }],
          }}
        />
      </Box>
    </Box>
  );
};

export default withSnackbar(NewClient);
