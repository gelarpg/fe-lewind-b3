import React from "react";
import { Box } from "@mui/material";

import useFetch from "app/hooks/useFetch";
import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import { useNavigate, useParams } from "react-router-dom";
import CustomForm from "./form";
import {
  uploadFileHandler,
  getDocumentNumber,
  getDocumentPath,
} from "app/utils/helpers";
import Div from "@jumbo/shared/Div";
import { CircularProgress } from "@mui/material";
import moment from "moment";

let PDF_BASE_URL = process.env.REACT_APP_API_BASE_URL_EXPORT;
PDF_BASE_URL = PDF_BASE_URL.substring(0, PDF_BASE_URL.length - 1);

const EditOrder = (props) => {
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
    data: orderDetail,
    error: errorDetail,
  } = useFetch({
    url: `/orders/detail/${params.id}`,
  });

  const [isLoading, setLoading] = React.useState(false);

  const onSubmitData = (payload) => {
    setLoading(true);
    const temp = {};
    temp.status = payload.status.value;
    axiosFetch({
      method: "put",
      url: `/orders/edit/status/${params.id}`,
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        props.snackbarShowMessage("Data rekap order berhasil diubah");
        setTimeout(() => navigate("/orders"), 1500);
      },
      finally: () => setLoading(false),
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
              waste_name: orderDetail?.waste_name ?? "",
              status: orderDetail?.status
                ? {
                    value: orderDetail?.status,
                    label: orderDetail?.status_name,
                  }
                : null,
              client_id: orderDetail?.client_id
                ? {
                    value: orderDetail?.client_id,
                    label: orderDetail?.client_name,
                  }
                : null,
              transportation_id: orderDetail?.transportation_id
                ? {
                    value: orderDetail?.transportation_id,
                    label: orderDetail?.transportation_name,
                  }
                : null,
              driver_id: orderDetail?.driver_id
                ? {
                    value: orderDetail?.driver_id,
                    label: orderDetail?.driver_name,
                  }
                : null,
              address: orderDetail?.client_address ?? "",
              period: orderDetail?.period
                ? moment(orderDetail?.period)
                : null,
              service_fee:
                orderDetail?.service_fee
                  ?.toString()
                  ?.replace(/[$.]+/g, ",") ?? "",
              service_fee_file: getDocumentPath(
                orderDetail,
                "service_fee"
              ),
              invoice_file: getDocumentPath(orderDetail, "invoice"),
              travel_document_file: getDocumentPath(
                orderDetail,
                "travel_document"
              ),
              bast_file: getDocumentPath(orderDetail, "bast"),
              waste_receipt_file: getDocumentPath(
                orderDetail,
                "waste_receipt"
              ),
              transporter_file: getDocumentPath(
                orderDetail,
                "transporter"
              ),
              provider_file: getDocumentPath(orderDetail, "provider"),
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default withSnackbar(EditOrder);
