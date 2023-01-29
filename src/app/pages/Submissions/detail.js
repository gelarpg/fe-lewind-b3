import React from "react";
import { Box, CircularProgress } from "@mui/material";

import useFetch from "app/hooks/useFetch";
import { useParams } from "react-router-dom";
import CustomForm from "./form";

const DetailSubmission = () => {
  const params = useParams();

  const {
    isLoading: isLoadingDetail,
    data: submissionDetail,
    error: errorDetail,
  } = useFetch({
    url: `/submission/${params.id}`,
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
        ) : submissionDetail ? (
          <CustomForm
            onSubmit={() => void 0}
            isLoading={isLoadingDetail}
            isDetail={true}
            initialValues={{
              name: "",
              type: "",
              weight_unit: "",
              price_unit: "",
            }}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default DetailSubmission;
