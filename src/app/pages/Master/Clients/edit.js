import React from "react";
import { Box } from "@mui/material";

import useFetch from "app/hooks/useFetch";
import useAxiosFunction from "app/hooks/useAxiosFunction";
import { withSnackbar } from "app/components/SnackbarComponent";
import { useNavigate, useParams } from "react-router-dom";
import CustomForm from "./form";
import Div from "@jumbo/shared/Div";
import { CircularProgress } from "@mui/material";

const EditClient = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();

  const {
    isLoading: isLoadingDetail,
    data: clientDetail,
    error: errorDetail,
  } = useFetch({
    url: `/clients/detail/${params.id}`,
  });

  const onSubmitData = (payload) => {
    const temp = {
      ...payload,
      waste_id: payload.waste_id.value,
      transaction_fee: Number(
        payload.transaction_fee.replace(/[$.]+/g, "").replace(/[$,]+/g, ".")
      ),
    };
    delete temp.waste_type;
    delete temp.price_per_unit;
    axiosFetch({
      method: "put",
      url: `/clients/edit/${params.id}`,
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        props.snackbarShowMessage("Data client berhasil diubah");
        setTimeout(() => navigate("/clients"), 1500);
      },
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
              company_name: clientDetail?.company_name ?? "",
              name: clientDetail?.name ?? "",
              address: clientDetail?.address ?? "",
              offer_number: clientDetail?.offer_number ?? "",
              transaction_fee:
                clientDetail?.transaction_fee
                  ?.toString()
                  ?.replace(/[$.]+/g, ",") ?? "",
              waste_id: clientDetail?.waste_id
                ? {
                    value: clientDetail?.waste_id,
                    label: `${clientDetail?.waste_name}`,
                  }
                : null,
              waste_type: clientDetail?.waste_type ?? "",
              price_per_unit: clientDetail?.waste_price_unit
                ? `${new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(clientDetail?.waste_price_unit)} / ${
                    clientDetail?.waste_weight_unit
                  }`
                : "",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default withSnackbar(EditClient);
