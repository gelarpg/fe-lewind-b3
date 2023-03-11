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
import moment from "moment";

const EditSubmission = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const {
    isLoading: isLoadingDetail,
    data: clientDetail,
    error: errorDetail,
  } = useFetch({
    url: `/submission/${params.id}`,
  });

  const onSubmitData = (payload) => {
    const promises = [];
    const temp = {
      ...payload,
      service_fee: Number(
        payload.service_fee.replace(/[$.]+/g, "").replace(/[$,]+/g, ".")
      ),
      client_id: payload.client_id.value,
      transportation_id: payload.transportation_id.value,
      driver_id: payload.driver_id.value,
      period: moment(payload.period).format("YYYY-MM-DD HH:mm:ss"),
    };
    if (payload.service_fee_document) {
      promises.push({
        key: "service_fee_document",
        payload: payload.service_fee_document,
      });
    }
    if (payload.invoice_document) {
      promises.push({
        key: "invoice_document",
        payload: payload.invoice_document,
      });
    }
    if (payload.travel_document) {
      promises.push({
        key: "travel_document",
        payload: payload.travel_document,
      });
    }
    if (payload.bast_document) {
      promises.push({
        key: "bast_document",
        payload: payload.bast_document,
      });
    }
    if (payload.transporter_document) {
      promises.push({
        key: "transporter_document",
        payload: payload.transporter_document,
      });
    }
    if (payload.supplier_document) {
      promises.push({
        key: "supplier_document",
        payload: payload.supplier_document,
      });
    }
    if (payload.waste_document) {
      promises.push({
        key: "waste_document",
        payload: payload.waste_document,
      });
    }
    console.log(temp);
    // uploadFileHandler(promises).then((values) => {
    //   let dataToSend = {
    //     ...temp,
    //     ...values,
    //   };
    //   axiosFetch({
    //     method: "put",
    //     url: `/submission/edit/${params.id}`,
    //     requestConfig: {
    //       data: dataToSend,
    //     },
    //     onSuccess: () => {
    //       props.snackbarShowMessage('Data pengajuan berhasil diubah');
    //       setTimeout(() => navigate('/submissions'), 1500);
    //     },
    //   });
    // });
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
              name: "",
              address: "",
              offer_number: "",
              transaction_fee: "",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default withSnackbar(EditSubmission);
