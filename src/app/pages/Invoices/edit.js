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
if (PDF_BASE_URL) {
  PDF_BASE_URL = PDF_BASE_URL.substring(0, PDF_BASE_URL.length - 1);
} else {
  console.error("REACT_APP_API_BASE_URL_EXPORT tidak terdefinisi");
  // Anda bisa memberikan nilai default jika perlu
  PDF_BASE_URL = ''; // atau nilai lain yang sesuai
}

const EditInvoice = (props) => {
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
    data: invoiceDetail,
    error: errorDetail,
  } = useFetch({
    url: `/bills/detail/${params.id}`,
  });

  const [isLoading, setLoading] = React.useState(false);

  const editStatus = (payload) => {
    axiosFetch({
      method: "put",
      url: `/bills/edit/payment-status/${params.id}`,
      requestConfig: {
        data: payload,
      },
      onSuccess: () => {
        props.snackbarShowMessage("Data tagihan berhasil diubah");
        setTimeout(() => navigate("/invoices"), 1500);
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
    temp.payment_status = payload.status.value;

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

    uploadFileHandler(promises).then((values) => {
      let dataToSend = {
        ...tempEdit,
        ...values,
      };
      if (dataToSend) {
        updateData(dataToSend, () => editStatus(temp))
      } else {
        editStatus(temp)
      }
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
              transfer_amount: invoiceDetail?.transfer_amount?.toString()?.replace(/[$.]+/g, ',') ?? '',
              test: invoiceDetail?.submission_details?.length
                ? invoiceDetail?.submission_details?.map((x) => ({
                    transportation_id: x?.transportation_id
                      ? {
                          value: x?.transportation_id,
                          label: x?.transportation_name,
                        }
                      : null,
                    driver_id: x?.driver_id
                      ? {
                          value: x?.driver_id,
                          label: x?.driver_name,
                        }
                      : null,
                    period: x?.period ? moment(x?.period) : "",
                    waste_name: x?.waste_name ?? "",
                    waste_code: x?.waste_code ?? "",
                    qty: x?.qty?.toString()?.replace(/[$.]+/g, ",") ?? "",
                    isSelected: true,
                    waste_cost: x?.waste_cost ? `${new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(x.waste_cost)}${x?.waste_weight_unit ? `/${x?.waste_weight_unit}` : ''}` : '',
                    doc_number: x?.doc_number ?? '',
                    transport_target: x?.transport_target,
                  }))
                : [],
              status: invoiceDetail?.payment_status
                ? {
                    value: true,
                    label: "Dibayar",
                  }
                : {
                  value: false,
                  label: "Menunggu Pembayaran",
                },
              client_id: invoiceDetail?.client_id
                ? {
                    value: invoiceDetail?.client_id,
                    label: invoiceDetail?.client_company_name,
                  }
                : null,
              address: invoiceDetail?.client_address ?? "",
              service_fee:
                invoiceDetail?.service_fee
                  ?.toString()
                  ?.replace(/[$.]+/g, ",") ?? "",
              service_fee_file: getDocumentPath(
                invoiceDetail,
                "service_fee"
              ),
              invoice_file: getDocumentPath(invoiceDetail, "invoice"),
              travel_document_file: getDocumentPath(
                invoiceDetail,
                "travel_document"
              ),
              bast_file: getDocumentPath(invoiceDetail, "bast"),
              waste_receipt_file: getDocumentPath(
                invoiceDetail,
                "waste_receipt"
              ),
              transporter_file: getDocumentPath(
                invoiceDetail,
                "transporter"
              ),
              provider_file: getDocumentPath(invoiceDetail, "provider"),
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default withSnackbar(EditInvoice);
