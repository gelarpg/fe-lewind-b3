import React from "react";
import { Box } from "@mui/material";

import useFetch from "app/hooks/useFetch";
import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import { useNavigate, useParams } from "react-router-dom";
import CustomForm from "./form";
import moment from "moment";
import { getDocumentProperty, uploadFileHandler, getDocumentPath } from "app/utils/helpers";
import Div from "@jumbo/shared/Div";
import { CircularProgress } from "@mui/material";

let PDF_BASE_URL = process.env.REACT_APP_API_BASE_URL_EXPORT;
PDF_BASE_URL = PDF_BASE_URL.substring(0, PDF_BASE_URL.length - 1);

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
      if (typeof payload.attachment_stnk === "string") {
        if (temp.attachment_stnk) delete temp.attachment_stnk
      } else if (typeof payload.attachment_stnk === "object") {
        promises.push({
          key: "attachment_stnk",
          payload: payload.attachment_stnk,
        });
      }
    }
    if (payload.attachment_kir) {
      if (typeof payload.attachment_kir === "string") {
        if (temp.attachment_kir) delete temp.attachment_kir
      } else if (typeof payload.attachment_kir === "object") {
        promises.push({
          key: "attachment_kir",
          payload: payload.attachment_kir,
        });
      }
    }
    if (payload.attachment_rekom) {
      if (typeof payload.attachment_rekom === "string") {
        if (temp.attachment_rekom) delete temp.attachment_rekom
      } else if (typeof payload.attachment_rekom === "object") {
        promises.push({
          key: "attachment_rekom",
          payload: payload.attachment_rekom,
        });
      }
    }
    if (payload.attachment_supervision_card) {
      if (typeof payload.attachment_supervision_card === "string") {
        if (temp.attachment_supervision_card) delete temp.attachment_supervision_card
      } else if (typeof payload.attachment_supervision_card === "object") {
        promises.push({
          key: "attachment_supervision_card",
          payload: payload.attachment_supervision_card,
        });
      }
    }
    if (payload.attachment_departement_permit) {
      if (typeof payload.attachment_departement_permit === "string") {
        if (temp.attachment_departement_permit) delete temp.attachment_departement_permit
      } else if (typeof payload.attachment_departement_permit === "object") {
        promises.push({
          key: "attachment_departement_permit",
          payload: payload.attachment_departement_permit,
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
        url: `/transportation-license/edit/${params.id}`,
        requestConfig: {
          data: dataToSend,
        },
        onSuccess: () => {
          props.snackbarShowMessage("Data perizinan berhasil diubah");
          setTimeout(() => navigate("/licenses"), 1500);
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
              attachment_stnk: vehicleDetail?.attachment_stnk ? `${PDF_BASE_URL}${vehicleDetail?.attachment_stnk}` : "",
              attachment_kir: vehicleDetail?.attachment_kir ? `${PDF_BASE_URL}${vehicleDetail?.attachment_kir}` : "",
              attachment_rekom: vehicleDetail?.attachment_rekom ? `${PDF_BASE_URL}${vehicleDetail?.attachment_rekom}` : "",
              attachment_supervision_card: vehicleDetail?.attachment_supervision_card ? `${PDF_BASE_URL}${vehicleDetail?.attachment_supervision_card}` : "",
              attachment_departement_permit: vehicleDetail?.attachment_departement_permit ? `${PDF_BASE_URL}${vehicleDetail?.attachment_departement_permit}` : "",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default withSnackbar(EditLicense);
