import React from "react";
import { Box } from "@mui/material";

import useFetch from 'app/hooks/useFetch';
import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import { useNavigate, useParams } from 'react-router-dom';
import CustomForm from "./form";
import { uploadFileHandler, getDocumentNumber, getDocumentPath, getDocumentProperty } from "app/utils/helpers";
import Div from "@jumbo/shared/Div";
import { CircularProgress } from "@mui/material";
import moment from "moment";

let PDF_BASE_URL = process.env.REACT_APP_API_BASE_URL_EXPORT;
PDF_BASE_URL = PDF_BASE_URL.substring(0, PDF_BASE_URL.length - 1);

const EditDriver = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { isLoading: isLoadingAPI, data, error, axiosFetch } = useAxiosFunction();

  const {
    isLoading: isLoadingDetail,
    data: driverDetail,
    error: errorDetail,
  } = useFetch({
    url: `/driver/detail/${params.id}`,
  });

  const [isLoading, setLoading] = React.useState(false);

  const onSubmitData = (payload) => {
    setLoading(true);
    const promises = [];
    const temp = {
      ...payload,
    };
    temp.name = payload.name;
    temp.age = payload.age;
    if (!payload.phone_number.includes('+62')) {
      temp.phone_number = "+62" + payload.phone_number.replace(/\s+/g,"").replace(/_/g, "");
    } else {
      temp.phone_number = payload.phone_number.replace(/\s+/g,"").replace(/_/g, "");
    }
    temp.address = payload.address;
    temp.sim_validity_period = moment(payload.sim_validity_period).format("YYYY-MM-DD");

    if (payload.sim_file) {
      if (typeof payload.sim_file === "string") {
        if (temp.sim_file) delete temp.sim_file
        // temp.sim_file = payload.sim_file.replace(PDF_BASE_URL, '');
      } else if (typeof payload.sim_file === "object") {
        promises.push({
          key: "sim_file",
          payload: payload.sim_file,
        });
      }
    }
    if (payload.ktp_file) {
      if (typeof payload.ktp_file === "string") {
        if (temp.ktp_file) delete temp.ktp_file
        // temp.ktp_file = payload.ktp_file.replace(PDF_BASE_URL, '');
      } else if (typeof payload.ktp_file === "object") {
        promises.push({
          key: "ktp_file",
          payload: payload.ktp_file,
        });
      }
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
        finally: () => setLoading(false)
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
            isDetail={window.location.pathname.includes('/detail')}
            isLoading={isLoading || isLoadingAPI}
            initialValues={{
              sim_validity_period: getDocumentProperty(driverDetail, "sim", "validity_period") ? moment(getDocumentProperty(driverDetail, "sim", "validity_period")) : "",
              name: driverDetail?.name ?? "",
              age: driverDetail?.age ??  "",
              phone_number: driverDetail?.phone_number?.replace('+62', '') ??  "",
              address: driverDetail?.address ??  "",
              sim_number: getDocumentNumber(driverDetail, "sim") ?? "",
              ktp_number: getDocumentNumber(driverDetail, "ktp") ?? "",
              ktp_file: getDocumentPath(driverDetail, "ktp") ?? "",
              sim_file: getDocumentPath(driverDetail, "sim") ?? "",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default withSnackbar(EditDriver);
