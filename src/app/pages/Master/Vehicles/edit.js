import React from "react";
import { Box } from "@mui/material";

import useFetch from "app/hooks/useFetch";
import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import { useNavigate, useParams } from "react-router-dom";
import CustomForm from "./form";
import moment from "moment";
import { uploadFileHandler } from "app/utils/helpers";
import Div from "@jumbo/shared/Div";
import { CircularProgress } from "@mui/material";

const EditVehicles = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const {
    isLoading: isLoadingDetail,
    data: vehicleDetail,
    error: errorDetail,
  } = useFetch({
    url: `/transportation/detail/${params.id}`,
  });

  const onSubmitData = (payload) => {
    const promises = [];
    const temp = {
      ...payload,
      transportation_type_id: payload.transportation_type_id.value,
      fuel_type: payload.fuel_type,
      year: moment(payload.year).format("YYYY"),
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
        method: "put",
        url: `/transportation/edit/${params.id}`,
        requestConfig: {
          data: dataToSend,
        },
        onSuccess: () => {
          props.snackbarShowMessage("Data kendaraan berhasil diubah");
          setTimeout(() => navigate("/vehicles"), 1500);
        },
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
            isLoading={isLoading}
            initialValues={{
              name: vehicleDetail?.name ?? "",
              no_police: vehicleDetail?.no_police ?? "",
              year: vehicleDetail?.year ?? "",
              capacity: vehicleDetail?.capacity ?? "",
              fuel_type: vehicleDetail?.fuel_type ?? "",
              transportation_type_id: vehicleDetail?.transportation_type_id
                ? {
                    value: vehicleDetail?.transportation_type_id,
                    label: vehicleDetail?.transportation_type_name,
                  }
                : null,
              travel_document_number: vehicleDetail?.documents?.length
                ? vehicleDetail?.documents.find(
                    (x) => x.type === "travel_document"
                  ).doc_number
                : "",
              stnk_number: vehicleDetail?.documents?.length
                ? vehicleDetail?.documents.find((x) => x.type === "stnk")
                    .doc_number
                : "",
              stnk_file: vehicleDetail?.documents?.length
                ? vehicleDetail?.documents.find((x) => x.type === "stnk").path
                : "",
              travel_document_file: vehicleDetail?.documents?.length
                ? vehicleDetail?.documents.find(
                    (x) => x.type === "travel_document"
                  ).path
                : "",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default withSnackbar(EditVehicles);
