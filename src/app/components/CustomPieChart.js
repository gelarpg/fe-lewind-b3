import React from "react";
import PropTypes from "prop-types";
import { Typography, Stack, Box } from "@mui/material";
import { Tooltip, Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Div from "@jumbo/shared/Div";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={"middle"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartLegend = ({ payload }) => {
  return (
    <Div
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      {payload.map((entry, index) => {
        return (
          <Div
            key={`legend-${index}`}
            sx={{ display: "flex", width: "100%", alignItems: "center" }}
          >
            <FiberManualRecordIcon
              fontSize={"14px"}
              sx={{ color: entry.color, marginRight: 2 }}
            />
            <Typography
              variant={"body1"}
              fontSize={"14px"}
              sx={{ color: "#000000" }}
            >
              {entry.name}
            </Typography>
          </Div>
        );
      })}
    </Div>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <div className="mytooltip">
        {`${payload[0].name} : ${payload[0].value}`}
      </div>
    );
  }
  return null;
};

const CustomPieChart = ({ data }) => {
  return data?.some((x) => x.value > 0) ? (
    <Stack direction="row" spacing={2} sx={{ height: 200 }}>
      <PieChartLegend payload={data?.filter(x => x.value > 0)} />
      <Div
        sx={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data?.filter(x => x.value > 0)}
              paddingAngle={5}
              dataKey="value"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data?.filter(x => x.value > 0).map((item, index) => (
                <Cell key={index} fill={item.color} />
              ))}
            </Pie>
            <Tooltip
              content={<CustomTooltip />}
              wrapperStyle={{ outline: "none" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Div>
    </Stack>
  ) : (
    <Box
      sx={{
        width: "100%",
        height: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant={"body1"} fontSize={"14px"} sx={{ color: "#000000" }}>
        Tidak ada data untuk ditampilkan
      </Typography>
    </Box>
  );
};

CustomPieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      color: PropTypes.string.isRequired,
    })
  ),
};
export default CustomPieChart;
