import React from "react";
import { Box, CircularProgress } from "@mui/material";

import useFetch from "app/hooks/useFetch";
import { useParams } from "react-router-dom";
import CustomForm from "./form";

const DetailWaste = () => {
  const params = useParams();

  const {
    isLoading: isLoadingDetail,
    data: wasteDetail,
    error: errorDetail,
  } = useFetch({
    url: `/waste/detail/${params.id}`,
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
        ) : wasteDetail ? (
          <CustomForm
            onSubmit={() => void 0}
            isLoading={isLoadingDetail}
            isDetail={true}
            initialValues={{
              name: wasteDetail?.name ?? "",
              type: wasteDetail?.type ?? "",
              weight_unit: wasteDetail?.weight_unit ?? "",
              price_unit: wasteDetail?.price_unit?.toString()?.replace(/[$.]+/g, ',') ?? '',
            }}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default DetailWaste;
