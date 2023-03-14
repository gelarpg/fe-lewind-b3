import React, { useState } from "react";
import { Box } from "@mui/material";

import moment from "moment";

import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import CustomForm from "./form";
import { useNavigate } from "react-router-dom";
import { uploadFileHandler } from "app/utils/helpers";

const NewSubmission = (props) => {
  const { isLoading: isLoadingAPI, data, error, axiosFetch } = useAxiosFunction();
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);

  const onSubmitData = (payload) => {
    setLoading(true);
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
    if (payload.provider_document) {
      promises.push({
        key: "provider_document",
        payload: payload.provider_document,
      });
    }
    if (payload.waste_document) {
      promises.push({
        key: "waste_document",
        payload: payload.waste_document,
      });
    }
    uploadFileHandler(promises).then((values) => {
      let dataToSend = {
        ...temp,
        ...values,
      };
      axiosFetch({
        method: "post",
        url: "/submission/create",
        requestConfig: {
          data: dataToSend,
        },
        onSuccess: () => {
          props.snackbarShowMessage("Data pengajuan berhasil ditambahkan");
          setTimeout(() => navigate('/submissions'), 1500);
        },
        finally: () => setLoading(false)
      });
    });
  };

  return (
    <Box>
      <Box p={3}>
        <CustomForm
          onSubmit={onSubmitData}
          isLoading={isLoading}
          initialValues={{
            client_id: null,
            transportation_id: null,
            driver_id: null,
            address: "",
            period: "",
            service_fee: "",
            service_fee_document: null,
            invoice_document: null,
            travel_document: null,
            bast_document: null,
            waste_document: null,
            transporter_document: null,
            provider_document: null,
          }}
        />
      </Box>
    </Box>
  );
};

export default withSnackbar(NewSubmission);
