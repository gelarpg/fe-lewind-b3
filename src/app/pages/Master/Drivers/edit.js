import React from "react";
import { Box } from "@mui/material";

import useFetch from 'app/hooks/useFetch';
import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import { useNavigate, useParams } from 'react-router-dom';
import CustomForm from "./form";

const EditDriver = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const {
    isLoading: isLoadingDetail,
    data: driverDetail,
    error: errorDetail,
  } = useFetch({
    url: `/driver/detail/${params.id}`,
  });

  const onSubmitData = (payload) => {
    const temp = {
      ...payload,
    };
    temp.name = payload.name;
    temp.age = payload.age;
    temp.phone_number = payload.phone_number.replace(/\s+/g,"").replace(/_/g, "");
    temp.address = payload.address;
    axiosFetch({
      method: "put",
      url: `/driver/edit/${params.id}`,
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        props.snackbarShowMessage('Data driver berhasil diubah');
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
            name: driverDetail?.name ?? "",
            age: driverDetail?.age ??  "",
            phone_number: driverDetail?.phone_number?.replace('+62', '') ??  "",
            address: driverDetail?.address ??  "",
          }}
        />
      </Box>
    </Box>
  );
};

export default withSnackbar(EditDriver);
