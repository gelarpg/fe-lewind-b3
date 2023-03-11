import React from "react";
import { Box } from "@mui/material";

import useFetch from 'app/hooks/useFetch';
import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import { useNavigate, useParams } from 'react-router-dom';
import CustomForm from "./form";

const EditWaste = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const {
    isLoading: isLoadingDetail,
    data: wasteDetail,
    error: errorDetail,
  } = useFetch({
    url: `/waste/detail/${params.id}`,
  });

  const onSubmitData = (payload) => {
    const temp = {
      ...payload,
      price_unit: Number(payload.price_unit.replace(/[$.]+/g, '').replace(/[$,]+/g, '.')),
    };
    axiosFetch({
      method: "put",
      url: `/waste/edit/${params.id}`,
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        props.snackbarShowMessage('Data limbah berhasil diubah');
        navigate('/wastes');
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
            name: wasteDetail?.name ?? "",
            type: wasteDetail?.type ?? "",
            weight_unit: wasteDetail?.weight_unit ?? "",
            price_unit: wasteDetail?.price_unit?.toString()?.replace(/[$.]+/g, ',') ?? '',
          }}
        />
      </Box>
    </Box>
  );
};

export default withSnackbar(EditWaste);
