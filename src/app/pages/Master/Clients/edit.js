import React from "react";
import { Box } from "@mui/material";

import useFetch from 'app/hooks/useFetch';
import useAxiosFunction from "app/hooks/useAxiosFunction";
import useNotif from "app/hooks/useNotif";
import { useNavigate, useParams } from 'react-router-dom';
import CustomForm from "./form";

const EditClient = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [notif, sendNotification] = useNotif();
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const {
    isLoading: isLoadingDetail,
    data: clientDetail,
    error: errorDetail,
  } = useFetch({
    url: `/clients/${params.id}`,
  });

  const onSubmitData = (payload) => {
    const temp = {
      ...payload,
    };
    axiosFetch({
      method: "put",
      url: `/clients/edit/${params.id}`,
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        sendNotification({msg: 'Data client berhasil diubah', variant: 'success'});
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
            name: "",
            address: "",
            offer_number: "",
            transaction_fee: "",
          }}
        />
      </Box>
    </Box>
  );
};

export default EditClient;
