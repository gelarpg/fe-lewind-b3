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
import { withRoles } from "app/components/withRoles";

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

  // React.useEffect(() => {
  //   if (submissionDetail?.client_id) {
  //     setLoading(true);
  //     axiosFetch({
  //       method: "get",
  //       url: `/clients/detail/${submissionDetail?.client_id}`,
  //       onSuccess: (data) => {
  //         console.log(data)
  //       },
  //       finally: () => setLoading(false),
  //     });
  //   }
  // }, [submissionDetail]);

  const onSubmitData = (payload) => {
    setLoading(true);
    const promises = [];
    let temp = {};
    if (payload?.transfer_amount) temp.transfer_amount = Number(payload?.transfer_amount.replace(/[$.]+/g, "").replace(/[$,]+/g, "."));
    if (payload?.travel_fee_status?.value) temp.travel_fee_status = Boolean(payload.travel_fee_status.value);
    if (payload?.client_id?.value) temp.client_id = payload.client_id.value;
    if (payload?.service_fee)
      temp.service_fee = Number(
        payload.service_fee.replace(/[$.]+/g, "").replace(/[$,]+/g, ".")
      );

    if (payload?.test?.length) {
      temp.waste = [];
      payload?.test
        .filter((a) => a.isSelected)
        .map((x, key) => {
          temp.waste.push({
            transportation_id: x.transportation_id.value,
            driver_id: x.driver_id.value,
            period: moment(x.period).format("YYYY-MM-DD"),
            waste_id: x.waste_id,
            qty: Number(x.qty.replace(/[$.]+/g, "").replace(/[$,]+/g, ".")),
            doc_number: x.doc_number,
            transport_target: x?.transport_target,
          });
        });
    }

    if (payload.service_fee_file) {
      if (typeof payload.service_fee_file === "string") {
        if (temp.service_fee_file) delete temp.service_fee_file;
      } else if (typeof payload.service_fee_file === "object") {
        promises.push({
          key: "service_fee_file",
          payload: payload.service_fee_file,
        });
      }
    }
    // if (payload.invoice_file) {
    //   if (typeof payload.invoice_file === "string") {
    //     if (temp.invoice_file) delete temp.invoice_file;
    //   } else if (typeof payload.invoice_file === "object") {
    //     promises.push({
    //       key: "invoice_file",
    //       payload: payload.invoice_file,
    //     });
    //   }
    // }
    if (payload.travel_document_file) {
      if (typeof payload.travel_document_file === "string") {
        if (temp.travel_document_file) delete temp.travel_document_file;
      } else if (typeof payload.travel_document_file === "object") {
        promises.push({
          key: "travel_document_file",
          payload: payload.travel_document_file,
        });
      }
    }
    if (payload.bast_file) {
      if (typeof payload.bast_file === "string") {
        if (temp.bast_file) delete temp.bast_file;
      } else if (typeof payload.bast_file === "object") {
        promises.push({
          key: "bast_file",
          payload: payload.bast_file,
        });
      }
    }
    if (payload.transporter_file) {
      if (typeof payload.transporter_file === "string") {
        if (temp.transporter_file) delete temp.transporter_file;
      } else if (typeof payload.transporter_file === "object") {
        promises.push({
          key: "transporter_file",
          payload: payload.transporter_file,
        });
      }
    }
    // if (payload.provider_file) {
    //   if (typeof payload.provider_file === "string") {
    //     if (temp.provider_file) delete temp.provider_file;
    //   } else if (typeof payload.provider_file === "object") {
    //     promises.push({
    //       key: "provider_file",
    //       payload: payload.provider_file,
    //     });
    //   }
    // }
    if (payload.waste_receipt_file) {
      if (typeof payload.waste_receipt_file === "string") {
        if (temp.waste_receipt_file) delete temp.waste_receipt_file;
      } else if (typeof payload.waste_receipt_file === "object") {
        promises.push({
          key: "waste_receipt_file",
          payload: payload.waste_receipt_file,
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
      <Box>
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
            isDetail={window.location.pathname.includes("/detail")}
            onSubmit={onSubmitData}
            isLoading={isLoading || isLoadingAPI}
            initialValues={{
              test: submissionDetail?.submission_details?.length
                ? submissionDetail?.submission_details?.map((x) => ({
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
                    waste_id: x?.waste_id ?? "",
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
              client_id: submissionDetail?.client_id
                ? {
                    value: submissionDetail?.client_id,
                    label: submissionDetail?.client_company_name,
                  }
                : null,
              address: submissionDetail?.client_address ?? "",
              service_fee:
                submissionDetail?.service_fee
                  ?.toString()
                  ?.replace(/[$.]+/g, ",") ?? "",
              service_fee_file: getDocumentPath(
                submissionDetail,
                "service_fee"
              ),
              transfer_amount: submissionDetail?.transfer_amount?.toString()?.replace(/[$.]+/g, ',') ?? '',
              // invoice_file: getDocumentPath(submissionDetail, "invoice"),
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
              // provider_file: getDocumentPath(submissionDetail, "provider"),
              travel_fee_status: submissionDetail?.travel_fee_status
                ? {
                    value: true,
                    label: "Sudah Ditransfer",
                  }
                : {
                    value: false,
                    label: "Belum Ditransfer",
                  },
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default withRoles(withSnackbar(EditSubmission));
