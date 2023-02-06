import React from "react";
import { Box, CircularProgress } from "@mui/material";

import useFetch from "app/hooks/useFetch";
import { useParams } from "react-router-dom";
import CustomForm from "./form";

const DetailVehicle = () => {
  const params = useParams();

  const {
    isLoading: isLoadingDetail,
    data: vehicleDetail,
    error: errorDetail,
  } = useFetch({
    url: `/transportation/${params.id}`,
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
        ) : vehicleDetail ? (
          <CustomForm
            onSubmit={() => void 0}
            isLoading={isLoadingDetail}
            isDetail={true}
            initialValues={{
              name: vehicleDetail?.name ?? "",
              no_police: vehicleDetail?.no_police ?? "",
              year: vehicleDetail?.year ?? "",
              capacity: vehicleDetail?.capacity ?? "",
              fuel_type: vehicleDetail?.fuel_type ?? "",
              transportation_type_id: vehicleDetail?.transportation_type_id ? {value: vehicleDetail?.transportation_type_id, label: vehicleDetail?.transportation_type_name} : null,
            }}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default DetailVehicle;
