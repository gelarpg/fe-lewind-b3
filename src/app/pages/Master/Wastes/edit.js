import React from "react";
import { Box } from "@mui/material";

import useFetch from 'app/hooks/useFetch';
import useAxiosFunction from "app/hooks/useAxiosFunction";
import useNotif from "app/hooks/useNotif";
import { useNavigate, useParams } from 'react-router-dom';
import CustomForm from "./form";

const EditWaste = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [notif, sendNotification] = useNotif();
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const {
    isLoading: isLoadingDetail,
    data: wasteDetail,
    error: errorDetail,
  } = useFetch({
    url: `/waste/${params.id}`,
  });

  const onSubmitData = (payload) => {
    const temp = {
      ...payload,
    };
    axiosFetch({
      method: "put",
      url: `/waste/edit/${params.id}`,
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        sendNotification({msg: 'Data limbah berhasil diubah', variant: 'success'});
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

export default EditWaste;
