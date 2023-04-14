import React, { useState } from "react";
import { Box } from "@mui/material";

import moment from "moment";

import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import CustomForm from "./form";
import { useNavigate } from "react-router-dom";

const NewLicense = (props) => {
  const navigate = useNavigate();
  const { isLoading: isLoadingAPI, data, error, axiosFetch } = useAxiosFunction();

  const [isLoading, setLoading] = useState(false);

  const onSubmitData = (payload) => {
    setLoading(true);
    const temp = {
      transportation_id: payload.transportation_id,
      validity_period_kir: moment(payload.validity_period_kir).format("YYYY-MM-DD"),
      validity_period_rekom: moment(payload.validity_period_rekom).format("YYYY-MM-DD"),
      validity_period_supervision_card: moment(payload.validity_period_supervision_card).format("YYYY-MM-DD"),
      validity_period_stnk: moment(payload.validity_period_stnk).format("YYYY-MM-DD"),
      validity_period_departement_permit: moment(payload.validity_period_departement_permit).format("YYYY-MM-DD"),
    };
    axiosFetch({
      method: "post",
      url: "/transportation-license/create",
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        props.snackbarShowMessage("Data perizinan berhasil ditambahkan");
        setTimeout(() => navigate("/licenses"), 1500);
      },
      finally: () => setLoading(false)
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
          }}
        />
      </Box>
    </Box>
  );
};

export default withSnackbar(NewLicense);
