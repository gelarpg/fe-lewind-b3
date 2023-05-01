import React, { useState } from "react";
import { Box } from "@mui/material";

import moment from "moment";

import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import CustomForm from "./form";
import { useNavigate } from "react-router-dom";
import { uploadFileHandler } from "app/utils/helpers";

const NewLicense = (props) => {
  const navigate = useNavigate();
  const { isLoading: isLoadingAPI, data, error, axiosFetch } = useAxiosFunction();

  const [isLoading, setLoading] = useState(false);

  const onSubmitData = (payload) => {
    setLoading(true);
    const promises = [];
    const temp = {
      transportation_id: payload.transportation_id,
      validity_period_kir: moment(payload.validity_period_kir).format("YYYY-MM-DD"),
      validity_period_rekom: moment(payload.validity_period_rekom).format("YYYY-MM-DD"),
      validity_period_supervision_card: moment(payload.validity_period_supervision_card).format("YYYY-MM-DD"),
      validity_period_stnk: moment(payload.validity_period_stnk).format("YYYY-MM-DD"),
      validity_period_departement_permit: moment(payload.validity_period_departement_permit).format("YYYY-MM-DD"),
    };

    if (payload.attachment_stnk) {
      promises.push({
        key: "attachment_stnk",
        payload: payload.attachment_stnk,
      });
    }
    if (payload.attachment_kir) {
      promises.push({
        key: "attachment_kir",
        payload: payload.attachment_kir,
      });
    }
    if (payload.attachment_rekom) {
      promises.push({
        key: "attachment_rekom",
        payload: payload.attachment_rekom,
      });
    }
    if (payload.attachment_supervision_card) {
      promises.push({
        key: "attachment_supervision_card",
        payload: payload.attachment_supervision_card,
      });
    }
    if (payload.attachment_departement_permit) {
      promises.push({
        key: "attachment_departement_permit",
        payload: payload.attachment_departement_permit,
      });
    }
    uploadFileHandler(promises).then((values) => {
      let dataToSend = {
        ...temp,
        ...values,
      };
      axiosFetch({
        method: "post",
        url: "/transportation-license/create",
        requestConfig: {
          data: dataToSend,
        },
        onSuccess: () => {
          props.snackbarShowMessage("Data perizinan berhasil ditambahkan");
          setTimeout(() => navigate("/licenses"), 1500);
        },
        finally: () => setLoading(false)
      });
    });
  };

  return (
    <Box>
      <Box p={5} mx={4}>
        <CustomForm
          onSubmit={onSubmitData}
          isLoading={isLoading || isLoadingAPI}
          initialValues={{
            transportation_id: "",
            // transportation_type: "",
            name: "",
            validity_period_kir: "",
            validity_period_rekom: "",
            validity_period_supervision_card: "",
            validity_period_stnk: "",
            validity_period_departement_permit: "",
            no_police: null,
            attachment_stnk: null,
            attachment_kir: null,
            attachment_rekom: null,
            attachment_supervision_card: null,
            attachment_departement_permit: null
          }}
        />
      </Box>
    </Box>
  );
};

export default withSnackbar(NewLicense);
