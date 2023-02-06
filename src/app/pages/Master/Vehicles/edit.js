import React from "react";
import { Box } from "@mui/material";

import useFetch from 'app/hooks/useFetch';
import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import { useNavigate, useParams } from 'react-router-dom';
import CustomForm from "./form";

const EditVehicles = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const {
    isLoading: isLoadingDetail,
    data: vehicleDetail,
    error: errorDetail,
  } = useFetch({
    url: `/transportation/${params.id}`,
  });

  const onSubmitData = (payload) => {
    const temp = {
      ...payload,
      transportation_type_id: payload.transportation_type_id.value,
      fuel_type: payload.fuel_type,
    };
    axiosFetch({
      method: "put",
      url: `/transportation/edit/${params.id}`,
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        props.snackbarShowMessage('Data kendaraan berhasil diubah');
        navigate('/vehicles');
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
            name: vehicleDetail?.name ?? "",
            no_police: vehicleDetail?.no_police ?? "",
            year: vehicleDetail?.year ?? "",
            capacity: vehicleDetail?.capacity ?? "",
            fuel_type: vehicleDetail?.fuel_type ?? "",
            transportation_type_id: vehicleDetail?.transportation_type_id ? {value: vehicleDetail?.transportation_type_id, label: vehicleDetail?.transportation_type_name} : null,
          }}
        />
      </Box>
    </Box>
  );
};

export default withSnackbar(EditVehicles);
