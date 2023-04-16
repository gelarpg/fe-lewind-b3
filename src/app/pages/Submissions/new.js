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
    let temp = {};
    if (payload?.client_id?.value) temp.client_id = payload.client_id.value;
    if (payload?.service_fee) temp.service_fee = Number(
      payload.service_fee.replace(/[$.]+/g, "").replace(/[$,]+/g, ".")
    );
    if (payload?.waste_cost) temp.waste_cost = Number(payload.waste_cost.replace(/[$.]+/g, '').replace(/[$,]+/g, '.'));
    // if (payload?.period) temp.period = moment(payload.period).format("YYYY-MM-DD HH:mm:ss");
    if (payload?.test?.length) temp.period = moment(payload.test[0].period).format("YYYY-MM-DD HH:mm:ss");
    // if (payload?.transportation_id?.value) temp.transportation_id = payload.transportation_id.value;
    if (payload?.test?.length) temp.transportation_id = payload.test[0].transportation_id.value;
    // if (payload?.driver_id?.value) temp.driver_id = payload.driver_id.value;
    if (payload?.test?.length) temp.driver_id = payload.test[0].driver_id.value;
    if (payload.service_fee_file) {
      promises.push({
        key: "service_fee_file",
        payload: payload.service_fee_file,
      });
    }
    if (payload.invoice_file) {
      promises.push({
        key: "invoice_file",
        payload: payload.invoice_file,
      });
    }
    if (payload.travel_document_file) {
      promises.push({
        key: "travel_document_file",
        payload: payload.travel_document_file,
      });
    }
    if (payload.bast_file) {
      promises.push({
        key: "bast_file",
        payload: payload.bast_file,
      });
    }
    if (payload.transporter_file) {
      promises.push({
        key: "transporter_file",
        payload: payload.transporter_file,
      });
    }
    if (payload.provider_file) {
      promises.push({
        key: "provider_file",
        payload: payload.provider_file,
      });
    }
    if (payload.waste_receipt_file) {
      promises.push({
        key: "waste_receipt_file",
        payload: payload.waste_receipt_file,
      });
    }
    console.log(payload, temp)
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
          isLoading={isLoading || isLoadingAPI}
          initialValues={{
            test: [],
            client_id: null,
            waste_cost: "",
            address: "",
            service_fee: "",
            service_fee_file: null,
            invoice_file: null,
            travel_document_file: null,
            bast_file: null,
            waste_receipt_file: null,
            transporter_file: null,
            provider_file: null,
            travel_fee: null,
          }}
        />
      </Box>
    </Box>
  );
};

export default withSnackbar(NewSubmission);
