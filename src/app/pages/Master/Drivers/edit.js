import React from "react";
import { Box } from "@mui/material";

import useFetch from 'app/hooks/useFetch';
import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import { useNavigate, useParams } from 'react-router-dom';
import CustomForm from "./form";
import { uploadFileHandler } from "app/utils/helpers";
import Div from "@jumbo/shared/Div";
import { CircularProgress } from "@mui/material";

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
    const promises = [];
    const temp = {
      ...payload,
    };
    temp.name = payload.name;
    temp.age = payload.age;
    temp.phone_number = payload.phone_number.replace(/\s+/g,"").replace(/_/g, "");
    temp.address = payload.address;

    if (payload.sim_file) {
      promises.push({
        key: "sim_file",
        payload: payload.sim_file,
      });
    }
    if (payload.ktp_file) {
      promises.push({
        key: "ktp_file",
        payload: payload.ktp_file,
      });
    }
    uploadFileHandler(promises).then((values) => {
      let dataToSend = {
        ...temp,
        ...values,
      };
      axiosFetch({
        method: "put",
        url: `/driver/edit/${params.id}`,
        requestConfig: {
          data: dataToSend,
        },
        onSuccess: () => {
          props.snackbarShowMessage('Data driver berhasil diubah');
          setTimeout(() => navigate('/drivers'), 1500);
        },
      });
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
            isLoading={isLoading}
            initialValues={{
              name: driverDetail?.name ?? "",
              age: driverDetail?.age ??  "",
              phone_number: driverDetail?.phone_number?.replace('+62', '') ??  "",
              address: driverDetail?.address ??  "",
              sim_number: driverDetail?.documents?.length
                ? driverDetail?.documents.find(
                    (x) => x.type === "sim"
                  ).doc_number
                : "",
              ktp_number: driverDetail?.documents?.length
                ? driverDetail?.documents.find((x) => x.type === "ktp")
                    .doc_number
                : "",
              ktp_file: driverDetail?.documents?.length
                ? driverDetail?.documents.find((x) => x.type === "ktp").path
                : "",
              sim_file: driverDetail?.documents?.length
                ? driverDetail?.documents.find(
                    (x) => x.type === "sim"
                  ).path
                : "",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default withSnackbar(EditDriver);
