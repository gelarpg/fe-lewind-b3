import React from "react";
import { Box } from "@mui/material";

import useFetch from "app/hooks/useFetch";
import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import { useNavigate, useParams } from "react-router-dom";
import CustomForm from "./form";
import moment from "moment";
import { uploadFileHandler, getDocumentNumber, getDocumentPath, getDocumentProperty } from "app/utils/helpers";
import Div from "@jumbo/shared/Div";
import { CircularProgress } from "@mui/material";

let PDF_BASE_URL = process.env.REACT_APP_API_BASE_URL_EXPORT;
PDF_BASE_URL = PDF_BASE_URL.substring(0, PDF_BASE_URL.length - 1);

const EditVehicles = (props) => {
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
    url: `/transportation/detail/${params.id}`,
  });

  const [isLoading, setLoading] = React.useState(false);

  const onSubmitData = (payload) => {
    setLoading(true);
    const promises = [];
    const temp = {
      ...payload,
      capacity: Number(payload.capacity.replace(/[$.]+/g, '').replace(/[$,]+/g, '.')),
      transportation_type_id: payload.transportation_type_id.value,
      fuel_type: payload.fuel_type,
      year: moment(payload.year).format("YYYY"),
      // validity_period_kir: moment(payload.validity_period_kir).format("YYYY-MM-DD"),
      // validity_period_rekom: moment(payload.validity_period_rekom).format("YYYY-MM-DD"),
      // validity_period_supervision_card: moment(payload.validity_period_supervision_card).format("YYYY-MM-DD"),
      // stnk_validity_period: moment(payload.stnk_validity_period).format("YYYY-MM-DD"),
      // validity_period_departement_permit: moment(payload.validity_period_departement_permit).format("YYYY-MM-DD"),
    };
    if (payload.stnk_file) {
      if (typeof payload.stnk_file === "string") {
        // temp.stnk_file = payload.stnk_file.replace(PDF_BASE_URL, '');
        if (temp.stnk_file) delete temp.stnk_file
      } else if (typeof payload.stnk_file === "object") {
        promises.push({
          key: "stnk_file",
          payload: payload.stnk_file,
        });
      }
    }
    if (payload.travel_document_file) {
      if (typeof payload.travel_document_file === "string") {
        // temp.travel_document_file = payload.travel_document_file.replace(PDF_BASE_URL, '');
        if (temp.travel_document_file) delete temp.travel_document_file
      } else if (typeof payload.travel_document_file === "object") {
        promises.push({
          key: "travel_document_file",
          payload: payload.travel_document_file,
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
        url: `/transportation/edit/${params.id}`,
        requestConfig: {
          data: dataToSend,
        },
        onSuccess: () => {
          props.snackbarShowMessage("Data kendaraan berhasil diubah");
          setTimeout(() => navigate("/vehicles"), 1500);
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
              // validity_period_kir: vehicleDetail?.validity_period_kir ? moment(vehicleDetail?.validity_period_kir) : "",
              // validity_period_rekom: vehicleDetail?.validity_period_rekom ? moment(vehicleDetail?.validity_period_rekom) : "",
              // validity_period_supervision_card: vehicleDetail?.validity_period_supervision_card ? moment(vehicleDetail?.validity_period_supervision_card) : "",
              // stnk_validity_period: getDocumentProperty(vehicleDetail, "stnk", "validity_period") ? moment(getDocumentProperty(vehicleDetail, "stnk", "validity_period")) : "",
              // validity_period_departement_permit: vehicleDetail?.validity_period_departement_permit ? moment(vehicleDetail?.validity_period_departement_permit) : "",
              name: vehicleDetail?.name ?? "",
              no_police: vehicleDetail?.no_police ?? "",
              year: vehicleDetail?.year ?? "",
              capacity: vehicleDetail?.capacity ?? "",
              fuel_type: vehicleDetail?.fuel_type ?? "",
              transportation_type_id: vehicleDetail?.transportation_type_id
                ? {
                    value: vehicleDetail?.transportation_type_id,
                    label: vehicleDetail?.transportation_type,
                  }
                : null,
              travel_document_number: getDocumentNumber(vehicleDetail, "travel_document") ?? "",
              stnk_number: getDocumentNumber(vehicleDetail, "stnk") ?? "",
              stnk_file: getDocumentPath(vehicleDetail, "stnk") ?? "",
              travel_document_file: getDocumentPath(vehicleDetail, "travel_document") ?? "",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default withSnackbar(EditVehicles);
