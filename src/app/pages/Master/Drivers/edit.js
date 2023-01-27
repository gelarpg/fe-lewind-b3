import React from "react";
import { Box } from "@mui/material";

import useFetch from 'app/hooks/useFetch';
import useAxiosFunction from "app/hooks/useAxiosFunction";
import useNotif from "app/hooks/useNotif";
import { useNavigate, useParams } from 'react-router-dom';
import CustomForm from "./form";

const EditDriver = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [notif, sendNotification] = useNotif();
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const {
    isLoading: isLoadingDetail,
    data: driverDetail,
    error: errorDetail,
  } = useFetch({
    url: `/driver/${params.id}`,
  });

  const onSubmitData = (payload) => {
    const temp = {
      ...payload,
    };
    axiosFetch({
      method: "put",
      url: `/driver/edit/${params.id}`,
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        sendNotification({msg: 'Data driver berhasil diubah', variant: 'success'});
        navigate('/drivers');
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
              age: "",
              phone_number: "",
              address: "",
          }}
        />
      </Box>
    </Box>
  );
};

export default EditDriver;
