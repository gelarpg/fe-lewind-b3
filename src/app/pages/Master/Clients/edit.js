import React from "react";
import { Box } from "@mui/material";

import useFetch from 'app/hooks/useFetch';
import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import { useNavigate, useParams } from 'react-router-dom';
import CustomForm from "./form";

const EditClient = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const {
    isLoading: isLoadingDetail,
    data: clientDetail,
    error: errorDetail,
  } = useFetch({
    url: `/clients/detail/${params.id}`,
  });

  const onSubmitData = (payload) => {
    const temp = {
      ...payload,
      waste_id: payload.waste_id.value,
      transaction_fee: Number(payload.transaction_fee.replace(/[$.]+/g, '').replace(/[$,]+/g, '.')),
    };
    axiosFetch({
      method: "put",
      url: `/clients/edit/${params.id}`,
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        props.snackbarShowMessage('Data client berhasil diubah');
        navigate('/clients');
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
            name: clientDetail?.name ?? "",
            address: clientDetail?.address ?? "",
            offer_number: clientDetail?.offer_number ?? "",
            transaction_fee: clientDetail?.transaction_fee?.toString()?.replace(/[$.]+/g, ',') ?? '',
            waste_id: clientDetail?.waste_id ? {value: clientDetail?.waste_id, label: clientDetail?.waste_name} : null,
          }}
        />
      </Box>
    </Box>
  );
};

export default withSnackbar(EditClient);
