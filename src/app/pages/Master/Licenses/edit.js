import React from "react";
import { Box } from "@mui/material";

import useFetch from "app/hooks/useFetch";
import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import { useNavigate, useParams } from "react-router-dom";
import CustomForm from "./form";
import moment from "moment";
import { getDocumentProperty } from "app/utils/helpers";
import Div from "@jumbo/shared/Div";
import { CircularProgress } from "@mui/material";

const EditLicense = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const {
    isLoading: isLoadingAPI,
    data,
    error,
    axiosFetch,
  } = useAxiosFunction();

  const {
    isLoading: isLoadingDetail,
    data: vehicleDetail,
    error: errorDetail,
  } = useFetch({
    url: `/transportation-license/detail/${params.id}`,
  });

  const [isLoading, setLoading] = React.useState(false);

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
      method: "put",
      url: `/transportation-license/edit/${params.id}`,
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        props.snackbarShowMessage("Data perizinan berhasil diubah");
        setTimeout(() => navigate("/licenses"), 1500);
      },
      finally: () => setLoading(false)
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
            isLoading={isLoading || isLoadingAPI}
            isDetail={window.location.pathname.includes('/detail')}
            initialValues={{
              name: vehicleDetail?.name,
              no_police: vehicleDetail?.no_police ? {
                value: vehicleDetail?.no_police,
                label: vehicleDetail?.no_police
              } : null,
              transportation_id: vehicleDetail?.transportation_id ?? "",
              validity_period_kir: vehicleDetail?.validity_period_kir ? moment(vehicleDetail?.validity_period_kir) : "",
              validity_period_rekom: vehicleDetail?.validity_period_rekom ? moment(vehicleDetail?.validity_period_rekom) : "",
              validity_period_supervision_card: vehicleDetail?.validity_period_supervision_card ? moment(vehicleDetail?.validity_period_supervision_card) : "",
              validity_period_stnk: vehicleDetail?.validity_period_stnk ? moment(vehicleDetail?.validity_period_stnk) : "",
              validity_period_departement_permit: vehicleDetail?.validity_period_departement_permit ? moment(vehicleDetail?.validity_period_departement_permit) : "",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default withSnackbar(EditLicense);
