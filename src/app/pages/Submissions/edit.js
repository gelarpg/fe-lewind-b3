import React from "react";
import { Box } from "@mui/material";

import useFetch from 'app/hooks/useFetch';
import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import { useNavigate, useParams } from 'react-router-dom';
import CustomForm from "./form";
import { uploadFileHandler, getDocumentNumber, getDocumentPath } from "app/utils/helpers";
import Div from "@jumbo/shared/Div";
import { CircularProgress } from "@mui/material";
import moment from "moment";

let PDF_BASE_URL = process.env.REACT_APP_API_BASE_URL_EXPORT;
PDF_BASE_URL = PDF_BASE_URL.substring(0, PDF_BASE_URL.length - 1);

const EditSubmission = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { isLoading: isLoadingAPI, data, error, axiosFetch } = useAxiosFunction();

  const {
    isLoading: isLoadingDetail,
    data: clientDetail,
    error: errorDetail,
  } = useFetch({
    url: `/submission/${params.id}`,
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
    if (payload.service_fee_document) {
      if (typeof payload.service_fee_document === "string") {
        temp.service_fee_document = payload.service_fee_document.replace(PDF_BASE_URL, '');
      } else if (typeof payload.service_fee_document === "object") {
        promises.push({
          key: "service_fee_document",
          payload: payload.service_fee_document,
        });
      }
    }
    if (payload.invoice_document) {
      if (typeof payload.invoice_document === "string") {
        temp.invoice_document = payload.invoice_document.replace(PDF_BASE_URL, '');
      } else if (typeof payload.invoice_document === "object") {
        promises.push({
          key: "invoice_document",
          payload: payload.invoice_document,
        });
      }
    }
    if (payload.travel_document) {
      if (typeof payload.travel_document === "string") {
        temp.travel_document = payload.travel_document.replace(PDF_BASE_URL, '');
      } else if (typeof payload.travel_document === "object") {
        promises.push({
          key: "travel_document",
          payload: payload.travel_document,
        });
      }
    }
    if (payload.bast_document) {
      if (typeof payload.bast_document === "string") {
        temp.bast_document = payload.bast_document.replace(PDF_BASE_URL, '');
      } else if (typeof payload.bast_document === "object") {
        promises.push({
          key: "bast_document",
          payload: payload.bast_document,
        });
      }
    }
    if (payload.transporter_document) {
      if (typeof payload.transporter_document === "string") {
        temp.transporter_document = payload.transporter_document.replace(PDF_BASE_URL, '');
      } else if (typeof payload.transporter_document === "object") {
        promises.push({
          key: "transporter_document",
          payload: payload.transporter_document,
        });
      }
    }
    if (payload.supplier_document) {
      if (typeof payload.supplier_document === "string") {
        temp.supplier_document = payload.supplier_document.replace(PDF_BASE_URL, '');
      } else if (typeof payload.supplier_document === "object") {
        promises.push({
          key: "supplier_document",
          payload: payload.supplier_document,
        });
      }
    }
    if (payload.waste_document) {
      if (typeof payload.waste_document === "string") {
        temp.waste_document = payload.waste_document.replace(PDF_BASE_URL, '');
      } else if (typeof payload.waste_document === "object") {
        promises.push({
          key: "waste_document",
          payload: payload.waste_document,
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
          props.snackbarShowMessage('Data pengajuan berhasil diubah');
          setTimeout(() => navigate('/submissions'), 1500);
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
            isLoading={isLoading}
            initialValues={{
              name: "",
              address: "",
              offer_number: "",
              transaction_fee: "",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default withSnackbar(EditSubmission);
