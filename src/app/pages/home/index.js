import React, { useCallback, useEffect, useState } from "react";
import {
  Stack,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { groupBy, isEmpty } from "lodash";
import * as am4core from "@amcharts/amcharts4/core";
import moment from "moment";
import Div from "@jumbo/shared/Div";
import CustomPieChart from "app/components/CustomPieChart";
import CustomGroupedBarChart from "app/components/CustomGroupedBarChart";
import DatepickerComponent from "app/components/DatepickerComponent";

const transactionsStatus = [
  { name: "Dibayar", value: 43, color: "#5273E8" },
  { name: "Menunggu Pembayaran", value: 57, color: "#66C7FF" },
];
const wastesData = [
  { name: "Limbah Padat", value: 43, color: "#EA4569" },
  { name: "Limbah Cair", value: 57, color: "#5273E8" },
];

const submissionsData = [
  {
    date: "2022-01-25T12:31:37",
    value: 18,
  },
  {
    date: "2022-01-26T12:31:37",
    value: 23,
  },
  {
    date: "2022-01-27T12:31:37",
    value: 61,
  },
  {
    date: "2022-01-28T12:31:37",
    value: 10,
  },
  {
    date: "2022-01-29T12:31:37",
    value: 35,
  },
  {
    date: "2022-01-30T12:31:37",
    value: 84,
  },
  {
    date: "2022-02-01T12:31:37",
    value: 49,
  },
  {
    date: "2022-02-02T12:31:37",
    value: 79,
  },
  {
    date: "2022-02-03T12:31:37",
    value: 14,
  },
  {
    date: "2022-02-04T12:31:37",
    value: 45,
  },
  {
    date: "2022-02-05T12:31:37",
    value: 24,
  },
  {
    date: "2022-02-06T12:31:37",
    value: 46,
  },
  {
    date: "2022-02-07T12:31:37",
    value: 37,
  },
];

const wastesBarData = [
  {
    label: "Oli Bekas",
    value: 5,
  },
  {
    label: "Obat Sisa Produksi",
    value: 6,
  },
  {
    label: "Dross Alumunium",
    value: 4,
  },
  {
    label: "Kandungan Besi",
    value: 7,
  },
  {
    label: "Borongan",
    value: 6,
  },
];

const gradientSubmissionColor = new am4core.LinearGradient();
gradientSubmissionColor.addColor(am4core.color("#43BDF1"));
gradientSubmissionColor.addColor(am4core.color("#2A92F3"));

const gradientWastesColor = new am4core.LinearGradient();
gradientWastesColor.addColor(am4core.color("#F7C947"));
gradientWastesColor.addColor(am4core.color("#FF7B06"));
gradientWastesColor.cx = am4core.percent(68.75);
gradientWastesColor.cy = am4core.percent(100);
gradientWastesColor.rotation = 90;

const Home = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [submissionChartData, setSubmissionChartData] = useState([]);
  const [submissionOriginalData, setSubmissionOriginalData] = useState({});
  const [submissionProcess, setSubmissionProcess] = useState([]);
  const [submissionOriginalProcess, setSubmissionOriginalProcess] = useState(
    {}
  );
  const [wastesChartData, setWastesChartData] = useState([]);

  const getWastesChartData = useCallback((data) => {
    const chartDatas = wastesBarData.map((x, index) => ({
      category: "wastesItem_" + index,
      tooltipMsg: x.label,
      labelToShow: x.label,
      value: x.value,
    }));
    return chartDatas;
  }, []);

  const getSubmissionChartData = useCallback((data) => {
    const chartDatas = [];
    const originalDatas = {};
    const temp = groupBy(data, ({ date }) => moment(date).format("MMMM"));
    for (var grouped in temp) {
      const tempArray = [];
      for (var index in temp[grouped]) {
        tempArray.push({
          category: grouped + "_" + temp[grouped][index].value,
          tooltipMsg: moment(temp[grouped][index].date).format("DD MMMM YYYY"),
          labelToShow: moment(temp[grouped][index].date).format("DD"),
          value: temp[grouped][index].value,
          month: grouped,
        });
      }
      originalDatas[grouped] = tempArray;
      am4core.array.each(tempArray, function (item) {
        chartDatas.push(item);
      });
    }
    return { chartDatas, originalDatas };
  }, []);

  useEffect(() => {
    const { originalDatas, chartDatas } =
      getSubmissionChartData(submissionsData);
    setSubmissionChartData(chartDatas);
    setSubmissionOriginalData(originalDatas);

    const { originalDatas: newOriginalData, chartDatas: newChartData } =
      getSubmissionChartData(submissionsData);
    setSubmissionProcess(newChartData);
    setSubmissionOriginalProcess(newOriginalData);

    const wastesChart = getWastesChartData();
    setWastesChartData(wastesChart);
  }, []);

  return (
    <Div xs={{ width: "100%" }}>
      <Grid container spacing={2} mb={4} alignItems="center">
        <Grid item>
          <DatepickerComponent placeholder="Start Date" disableFuture value={startDate} onChange={setStartDate} />
        </Grid>
        <Grid item>
          <DatepickerComponent placeholder="End Date" disableFuture value={endDate} onChange={setEndDate} minDate={moment(startDate).toDate()} />
        </Grid>
        <Grid item>
          <Button type="button" variant="contained" disabled={!startDate || !endDate}>
            Filter
          </Button>
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2} mb={4}>
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Div
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6">Status Transaksi Pembayaran</Typography>
              <Typography
                variant="body1"
                sx={{ color: "#6D788B", fontSize: "10px" }}
              >
                Hingga hari ini
              </Typography>
            </Div>
            <CustomPieChart data={transactionsStatus} />
          </CardContent>
        </Card>
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Div
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6">Jumlah Limbah Yang diangkut</Typography>
              <Typography
                variant="body1"
                sx={{ color: "#6D788B", fontSize: "10px" }}
              >
                Hingga hari ini
              </Typography>
            </Div>
            <CustomPieChart data={wastesData} />
          </CardContent>
        </Card>
      </Stack>
      <Stack direction="row" spacing={2} mb={4}>
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Div
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6">Jumlah Pengajuan</Typography>
              <Typography
                variant="body1"
                sx={{ color: "#6D788B", fontSize: "10px" }}
              >
                Hingga hari ini
              </Typography>
            </Div>
            {submissionChartData.length && !isEmpty(submissionOriginalData) && (
              <CustomGroupedBarChart
                chartId="submissionData"
                generatedData={submissionChartData}
                originalData={submissionOriginalData}
                chartColor="#EA4569"
              />
            )}
          </CardContent>
        </Card>
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Div
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6">Jumlah Proses Pengajuan</Typography>
              <Typography
                variant="body1"
                sx={{ color: "#6D788B", fontSize: "10px" }}
              >
                Hingga hari ini
              </Typography>
            </Div>
            {submissionProcess.length &&
              !isEmpty(submissionOriginalProcess) && (
                <CustomGroupedBarChart
                  chartId="submissionProcess"
                  generatedData={submissionProcess}
                  originalData={submissionOriginalProcess}
                  chartColor={gradientSubmissionColor}
                />
              )}
          </CardContent>
        </Card>
      </Stack>
      <Stack direction="row" spacing={2} mb={4}>
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Div
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6">Kalkulasi Limbah</Typography>
              <Typography
                variant="body1"
                sx={{ color: "#6D788B", fontSize: "10px" }}
              >
                Hingga hari ini
              </Typography>
            </Div>
            {submissionChartData.length && !isEmpty(submissionOriginalData) && (
              <CustomGroupedBarChart
                chartId="wastesCalculation"
                generatedData={wastesChartData}
                chartColor="#98ECFF"
                isGroupped={false}
              />
            )}
          </CardContent>
        </Card>
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Div
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6">Jumlah Proses Selesai</Typography>
              <Typography
                variant="body1"
                sx={{ color: "#6D788B", fontSize: "10px" }}
              >
                Hingga hari ini
              </Typography>
            </Div>
            {submissionProcess.length &&
              !isEmpty(submissionOriginalProcess) && (
                <CustomGroupedBarChart
                  chartId="wastesProcess"
                  generatedData={submissionProcess}
                  originalData={submissionOriginalProcess}
                  chartColor={gradientWastesColor}
                />
              )}
          </CardContent>
        </Card>
      </Stack>
    </Div>
  );
};

export default Home;
