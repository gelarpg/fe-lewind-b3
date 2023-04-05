import React, { useState } from "react";
import { Box } from "@mui/material";

import moment from "moment";

import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import CustomForm from "./form";
import { useNavigate } from "react-router-dom";
import { uploadFileHandler } from "app/utils/helpers";

const NewVehicle = (props) => {
  const navigate = useNavigate();
  const { isLoading: isLoadingAPI, data, error, axiosFetch } = useAxiosFunction();

  const [isLoading, setLoading] = useState(false);

  const onSubmitData = (payload) => {
    setLoading(true);
    const promises = [];
    const temp = {
      ...payload,
      capacity: Number(payload.capacity.replace(/[$.]+/g, '').replace(/[$,]+/g, '.')),
      transportation_type_id: payload.transportation_type_id.value,
      year: moment(payload.year).format("YYYY"),
      validity_period_kir: moment(payload.validity_period_kir).format("YYYY-MM-DD"),
      validity_period_rekom: moment(payload.validity_period_rekom).format("YYYY-MM-DD"),
      validity_period_supervision_card: moment(payload.validity_period_supervision_card).format("YYYY-MM-DD"),
      stnk_validity_period: moment(payload.stnk_validity_period).format("YYYY-MM-DD"),
      validity_period_departement_permit: moment(payload.validity_period_departement_permit).format("YYYY-MM-DD"),
    };
    if (payload.stnk_file) {
      promises.push({
        key: "stnk_file",
        payload: payload.stnk_file,
      });
    }
    if (payload.travel_document_file) {
      promises.push({
        key: "travel_document_file",
        payload: payload.travel_document_file,
      });
    }
    uploadFileHandler(promises).then((values) => {
      let dataToSend = {
        ...temp,
        ...values,
      };
      axiosFetch({
        method: "post",
        url: "/transportation/create",
        requestConfig: {
          data: dataToSend,
        },
        onSuccess: () => {
          props.snackbarShowMessage("Data kendaraan berhasil ditambahkan");
          setTimeout(() => navigate("/vehicles"), 1500);
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
            validity_period_kir: "",
            validity_period_rekom: "",
            validity_period_supervision_card: "",
            stnk_validity_period: "",
            validity_period_departement_permit: "",
            name: "",
            no_police: "",
            year: "",
            capacity: "",
            fuel_type: "",
            transportation_type_id: null,
            travel_document_number: "",
            stnk_number: "",
            stnk_file: null,
            travel_document_file: null,
          }}
        />
      </Box>
    </Box>
  );
};

export default withSnackbar(NewVehicle);
