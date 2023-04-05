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

  const editStatus = (payload) => {
    axiosFetch({
      method: "put",
      url: `/orders/edit/status/${params.id}`,
      requestConfig: {
        data: payload,
      },
      onSuccess: () => {
        props.snackbarShowMessage("Data rekap order berhasil diubah");
        setTimeout(() => navigate("/orders"), 1500);
      },
      finally: () => setLoading(false),
    });
  }

  const updateData = (payload, callback) => {
    axiosFetch({
      method: "put",
      url: `/orders/edit/${params.id}`,
      requestConfig: {
        data: payload,
      },
      onSuccess: () => {
        if (callback) callback();
      },
      finally: () => setLoading(false),
    });
  }

  const onSubmitData = (payload) => {
    setLoading(true);
    const temp = {};
    const tempEdit = {};
    const promises = [];
    temp.status = payload.status.value;

    if (payload.invoice_file) {
      if (typeof payload.invoice_file === "string") {
        if (temp.invoice_file) delete temp.invoice_file
        // temp.invoice_file = payload.invoice_file.replace(PDF_BASE_URL, "");
      } else if (typeof payload.invoice_file === "object") {
        promises.push({
          key: "invoice_file",
          payload: payload.invoice_file,
        });
      }
    }
    if (payload.travel_document_file) {
      if (typeof payload.travel_document_file === "string") {
        if (temp.travel_document_file) delete temp.travel_document_file
        // temp.travel_document_file = payload.travel_document_file.replace(
        //   PDF_BASE_URL,
        //   ""
        // );
      } else if (typeof payload.travel_document_file === "object") {
        promises.push({
          key: "travel_document_file",
          payload: payload.travel_document_file,
        });
      }
    }
    if (payload.bast_file) {
      if (typeof payload.bast_file === "string") {
        if (temp.bast_file) delete temp.bast_file
        // temp.bast_file = payload.bast_file.replace(PDF_BASE_URL, "");
      } else if (typeof payload.bast_file === "object") {
        promises.push({
          key: "bast_file",
          payload: payload.bast_file,
        });
      }
    }
    if (payload.transporter_file) {
      if (typeof payload.transporter_file === "string") {
        if (temp.transporter_file) delete temp.transporter_file
        // temp.transporter_file = payload.transporter_file.replace(
        //   PDF_BASE_URL,
        //   ""
        // );
      } else if (typeof payload.transporter_file === "object") {
        promises.push({
          key: "transporter_file",
          payload: payload.transporter_file,
        });
      }
    }
    if (payload.provider_file) {
      if (typeof payload.provider_file === "string") {
        if (temp.provider_file) delete temp.provider_file
        // temp.provider_file = payload.provider_file.replace(PDF_BASE_URL, "");
      } else if (typeof payload.provider_file === "object") {
        promises.push({
          key: "provider_file",
          payload: payload.provider_file,
        });
      }
    }
    if (payload.waste_receipt_file) {
      if (typeof payload.waste_receipt_file === "string") {
        if (temp.waste_receipt_file) delete temp.waste_receipt_file
        // temp.waste_receipt_file = payload.waste_receipt_file.replace(
        //   PDF_BASE_URL,
        //   ""
        // );
      } else if (typeof payload.waste_receipt_file === "object") {
        promises.push({
          key: "waste_receipt_file",
          payload: payload.waste_receipt_file,
        });
      }
    }

    uploadFileHandler(promises).then((values) => {
      let dataToSend = {
        ...tempEdit,
        ...values,
      };
      updateData(dataToSend, () => editStatus(temp));
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
            isDetail={window.location.pathname.includes('/detail')}
            onSubmit={onSubmitData}
            isLoading={isLoading}
            initialValues={{
              waste_name: orderDetail?.waste_name ?? "",
              waste_cost: orderDetail?.waste_cost?.toString()?.replace(/[$.]+/g, ',') ?? '',
              waste_reference_price: orderDetail?.waste_price_unit ? `${new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
              }).format(orderDetail?.waste_price_unit)}` : "",
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
                : "",
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
