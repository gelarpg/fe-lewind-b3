import React from "react";
import { Box } from "@mui/material";

import useFetch from 'app/hooks/useFetch';
import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import { useNavigate, useParams } from 'react-router-dom';
import CustomForm from "./form";
import Div from "@jumbo/shared/Div";
import { CircularProgress } from "@mui/material";

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
      // price_unit: Number(payload.price_unit.replace(/[$.]+/g, '').replace(/[$,]+/g, '.')),
      type: payload.type.value
    };
    axiosFetch({
      method: "put",
      url: `/waste/edit/${params.id}`,
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        props.snackbarShowMessage('Data limbah berhasil diubah');
        setTimeout(() => navigate('/wastes'), 1500);
      },
    });
  };

  return (
    <Box>
      <Box p={5} mx={4}>
      {isLoadingDetail ? (
          <Div
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress sx={{ m: "-40px auto 0" }} />
          </Div>
        ) : (
          <CustomForm
            onSubmit={onSubmitData}
            isDetail={window.location.pathname.includes('/detail')}
            isLoading={isLoading}
            initialValues={{
              code: wasteDetail?.waste_code ?? "",
              name: wasteDetail?.name ?? "",
              type: wasteDetail?.waste_type_id ? { value: wasteDetail?.waste_type_id, label: wasteDetail?.type } : null ,
              weight_unit: wasteDetail?.weight_unit ?? "",
              // price_unit: wasteDetail?.price_unit?.toString()?.replace(/[$.]+/g, ',') ?? '',
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default withSnackbar(EditWaste);
