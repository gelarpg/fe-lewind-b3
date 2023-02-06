import React from "react";
import { Box, CircularProgress } from "@mui/material";

import useFetch from "app/hooks/useFetch";
import { useParams } from "react-router-dom";
import CustomForm from "./form";

const DetailDriver = () => {
  const params = useParams();

  const {
    isLoading: isLoadingDetail,
    data: driverDetail,
    error: errorDetail,
  } = useFetch({
    url: `/driver/${params.id}`,
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
        ) : driverDetail ? (
          <CustomForm
            onSubmit={() => void 0}
            isLoading={isLoadingDetail}
            isDetail={true}
            initialValues={{
              name: driverDetail?.name ?? "",
              age: driverDetail?.age ?? "",
              phone_number: driverDetail?.phone_number ?? "",
              address: driverDetail?.address ?? "",
            }}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default DetailDriver;
