import React from "react";
import { Box, CircularProgress } from "@mui/material";

import useFetch from "app/hooks/useFetch";
import { useParams } from "react-router-dom";
import CustomForm from "./form";

const DetailClient = () => {
  const params = useParams();

  const {
    isLoading: isLoadingDetail,
    data: clientDetail,
    error: errorDetail,
  } = useFetch({
    url: `/clients/detail/${params.id}`,
  });

  return (
    <Box>
      <Box p={5} mx={4}>
        {isLoadingDetail ? (
          <Box
            sx={{
              display: "flex",
              minWidth: 0,
              alignItems: "center",
              alignContent: "center",
              height: "500px",
            }}
          >
            <CircularProgress sx={{ m: "-40px auto 0" }} />
          </Box>
        ) : clientDetail ? (
          <CustomForm
            onSubmit={() => void 0}
            isLoading={isLoadingDetail}
            isDetail={true}
            initialValues={{
              name: clientDetail?.name ?? "",
            address: clientDetail?.address ?? "",
            offer_number: clientDetail?.offer_number ?? "",
            transaction_fee: clientDetail?.transaction_fee?.toString()?.replace(/[$.]+/g, ',') ?? '',
            waste_id: clientDetail?.waste_id ? {value: clientDetail?.waste_id, label: clientDetail?.waste_name} : null,
            }}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default DetailClient;
