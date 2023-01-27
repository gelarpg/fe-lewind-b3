import React from "react";
import { Box } from "@mui/material";

import useFetch from 'app/hooks/useFetch';
import useAxiosFunction from "app/hooks/useAxiosFunction";
import useNotif from "app/hooks/useNotif";
import { useNavigate, useParams } from 'react-router-dom';
import CustomForm from "./form";

const EditVehicles = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [notif, sendNotification] = useNotif();
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
    };
    axiosFetch({
      method: "put",
      url: `/transportation/edit/${params.id}`,
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        sendNotification({msg: 'Data kendaraan berhasil diubah', variant: 'success'});
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

export default EditVehicles;
