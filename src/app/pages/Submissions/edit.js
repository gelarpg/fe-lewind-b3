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

const EditSubmission = (props) => {
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
    data: submissionDetail,
    error: errorDetail,
  } = useFetch({
    url: `/submission/detail/${params.id}`,
  });

  const [isLoading, setLoading] = React.useState(false);

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
    if (payload.service_fee_file) {
      if (typeof payload.service_fee_file === "string") {
        temp.service_fee_file = payload.service_fee_file.replace(
          PDF_BASE_URL,
          ""
        );
      } else if (typeof payload.service_fee_file === "object") {
        promises.push({
          key: "service_fee_file",
          payload: payload.service_fee_file,
        });
      }
    }
    if (payload.invoice_file) {
      if (typeof payload.invoice_file === "string") {
        temp.invoice_file = payload.invoice_file.replace(PDF_BASE_URL, "");
      } else if (typeof payload.invoice_file === "object") {
        promises.push({
          key: "invoice_file",
          payload: payload.invoice_file,
        });
      }
    }
    if (payload.travel_document_file) {
      if (typeof payload.travel_document_file === "string") {
        temp.travel_document_file = payload.travel_document_file.replace(
          PDF_BASE_URL,
          ""
        );
      } else if (typeof payload.travel_document_file === "object") {
        promises.push({
          key: "travel_document_file",
          payload: payload.travel_document_file,
        });
      }
    }
    if (payload.bast_file) {
      if (typeof payload.bast_file === "string") {
        temp.bast_file = payload.bast_file.replace(PDF_BASE_URL, "");
      } else if (typeof payload.bast_file === "object") {
        promises.push({
          key: "bast_file",
          payload: payload.bast_file,
        });
      }
    }
    if (payload.transporter_file) {
      if (typeof payload.transporter_file === "string") {
        temp.transporter_file = payload.transporter_file.replace(
          PDF_BASE_URL,
          ""
        );
      } else if (typeof payload.transporter_file === "object") {
        promises.push({
          key: "transporter_file",
          payload: payload.transporter_file,
        });
      }
    }
    if (payload.provider_file) {
      if (typeof payload.provider_file === "string") {
        temp.provider_file = payload.provider_file.replace(PDF_BASE_URL, "");
      } else if (typeof payload.provider_file === "object") {
        promises.push({
          key: "provider_file",
          payload: payload.provider_file,
        });
      }
    }
    if (payload.waste_receipt_file) {
      if (typeof payload.waste_receipt_file === "string") {
        temp.waste_receipt_file = payload.waste_receipt_file.replace(
          PDF_BASE_URL,
          ""
        );
      } else if (typeof payload.waste_receipt_file === "object") {
        promises.push({
          key: "waste_receipt_file",
          payload: payload.waste_receipt_file,
        });
      }
    }
    console.log(temp);
    uploadFileHandler(promises).then((values) => {
      let dataToSend = {
        ...temp,
        ...values,
      };
      axiosFetch({
        method: "put",
        url: `/submission/edit/${params.id}`,
        requestConfig: {
          data: dataToSend,
        },
        onSuccess: () => {
          props.snackbarShowMessage("Data pengajuan berhasil diubah");
          setTimeout(() => navigate("/submissions"), 1500);
        },
        finally: () => setLoading(false),
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
              waste_name: submissionDetail?.waste_name ?? "",
              client_id: submissionDetail?.client_id
                ? {
                    value: submissionDetail?.client_id,
                    label: submissionDetail?.client_name,
                  }
                : null,
              transportation_id: submissionDetail?.transportation_id
                ? {
                    value: submissionDetail?.transportation_id,
                    label: submissionDetail?.transportation_name,
                  }
                : null,
              driver_id: submissionDetail?.driver_id
                ? {
                    value: submissionDetail?.driver_id,
                    label: submissionDetail?.driver_name,
                  }
                : null,
              address: submissionDetail?.client_address ?? "",
              period: submissionDetail?.period
                ? moment(submissionDetail?.period)
                : null,
              service_fee:
                submissionDetail?.service_fee
                  ?.toString()
                  ?.replace(/[$.]+/g, ",") ?? "",
              service_fee_file: getDocumentPath(
                submissionDetail,
                "service_fee"
              ),
              invoice_file: getDocumentPath(submissionDetail, "invoice"),
              travel_document_file: getDocumentPath(
                submissionDetail,
                "travel_document"
              ),
              bast_file: getDocumentPath(submissionDetail, "bast"),
              waste_receipt_file: getDocumentPath(
                submissionDetail,
                "waste_receipt"
              ),
              transporter_file: getDocumentPath(
                submissionDetail,
                "transporter"
              ),
              provider_file: getDocumentPath(submissionDetail, "provider"),
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default withSnackbar(EditSubmission);
