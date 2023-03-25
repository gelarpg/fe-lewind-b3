import React, { useCallback, useEffect, useState } from "react";
import {
  Stack,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { groupBy, isEmpty } from "lodash";
import * as am4core from "@amcharts/amcharts4/core";
import moment from "moment";
import Div from "@jumbo/shared/Div";
import CustomPieChart from "app/components/CustomPieChart";
import CustomGroupedBarChart from "app/components/CustomGroupedBarChart";
import DatepickerComponent from "app/components/DatepickerComponent";
import useFetch from "app/hooks/useFetch";
import { CircularProgress } from "@mui/material";

const transactionsStatus = [
  { status: true, name: "Dibayar", value: 0, color: "#5273E8" },
  { status: false, name: "Menunggu Pembayaran", value: 0, color: "#66C7FF" },
];
const wastesData = [
  { status: 5, name: "Dibatalkan", value: 0, color: "#EA4569" },
  { status: 6, name: "Selesai", value: 0, color: "#5273E8" },
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
  const {
    isLoading: isLoadingDashboard,
    data: dashboardData,
    error: errorDashboardData,
    refetch,
  } = useFetch({
    url: "/dashboard",
    requestConfig: {
      params: {},
    },
  });

  const [datas, setDatas] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [submissionChartData, setSubmissionChartData] = useState([]);
  const [submissionOriginalData, setSubmissionOriginalData] = useState({});
  const [submissionProcess, setSubmissionProcess] = useState([]);
  const [submissionOriginalProcess, setSubmissionOriginalProcess] = useState(
    {}
  );
  const [submissionFinish, setSubmissionFinish] = useState([]);
  const [submissionOriginalFinish, setSubmissionOriginalFinish] = useState({});
  const [wastesChartData, setWastesChartData] = useState([]);

  useEffect(() => {
    if (dashboardData) {
      if (dashboardData?.canceled_and_finished?.length) {
        dashboardData?.canceled_and_finished?.forEach((d) => {
          const idx = wastesData.findIndex((x) => x.status === d.status);
          if (idx > -1) {
            wastesData[idx]["percentage"] = d.percentage;
            wastesData[idx]["value"] = d.total;
          }
        });
      }
      if (dashboardData?.payment_status?.length) {
        dashboardData?.payment_status?.forEach((d) => {
          const idx = transactionsStatus.findIndex(
            (x) => x.status === d.status
          );
          if (idx > -1) {
            transactionsStatus[idx]["percentage"] = d.percentage;
            transactionsStatus[idx]["value"] = d.total;
          }
        });
      }
      if (dashboardData?.submissions?.length) {
        let newTemp = dashboardData?.submissions.map((x) => ({
          value: x.total,
          date: x.date,
        }));
        newTemp = newTemp.sort((a, b) => new Date(a.date) - new Date(b.date));
        const { originalDatas, chartDatas } = getSubmissionChartData(newTemp);
        setSubmissionChartData(chartDatas);
        setSubmissionOriginalData(originalDatas);
      } else {
        setSubmissionChartData([]);
        setSubmissionOriginalData({});
      }

      if (dashboardData?.process?.length) {
        let newTemp = dashboardData?.process.map((x) => ({
          value: x.total,
          date: x.date,
        }));
        newTemp = newTemp.sort((a, b) => new Date(a.date) - new Date(b.date));
        const { originalDatas, chartDatas } = getSubmissionChartData(newTemp);
        setSubmissionProcess(chartDatas);
        setSubmissionOriginalProcess(originalDatas);
      } else {
        setSubmissionProcess([]);
        setSubmissionOriginalProcess({});
      }

      if (dashboardData?.finished?.length) {
        let newTemp = dashboardData?.finished.map((x) => ({
          value: x.total,
          date: x.date,
        }));
        newTemp = newTemp.sort((a, b) => new Date(a.date) - new Date(b.date));
        const { originalDatas, chartDatas } = getSubmissionChartData(newTemp);
        setSubmissionFinish(chartDatas);
        setSubmissionOriginalFinish(originalDatas);
      } else {
        setSubmissionFinish([]);
        setSubmissionOriginalFinish({});
      }

      if (dashboardData?.waste?.length) {
        let wastesChart = getWastesChartData(dashboardData?.waste);
        setWastesChartData(wastesChart);
      }
      setDatas(dashboardData);
    }
  }, [dashboardData]);

  const getWastesChartData = useCallback((data) => {
    const chartDatas = data.map((x, index) => ({
      category: "wastesItem_" + index,
      tooltipMsg: x.name,
      labelToShow: x.name,
      value: x.total,
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

  const onClickFilter = useCallback(() => {
    const qParams = {};
    if (startDate)
      qParams["start_date"] = moment(startDate).format("YYYY-MM-DD");
    if (endDate)
      qParams["end_date"] = moment(endDate).format("YYYY-MM-DD");
    refetch({
      params: qParams,
    });
  }, [endDate, startDate]);

  return (
    <Div xs={{ width: "100%" }}>
      <Grid container spacing={2} mb={4} alignItems="center">
        <Grid item>
          <DatepickerComponent
            placeholder="Start Date"
            disableFuture
            value={startDate}
            onChange={setStartDate}
          />
        </Grid>
        <Grid item>
          <DatepickerComponent
            placeholder="End Date"
            disableFuture
            value={endDate}
            onChange={setEndDate}
            minDate={moment(startDate).toDate()}
          />
        </Grid>
        <Grid item>
          <Button
            type="button"
            variant="contained"
            onClick={onClickFilter}
            disabled={!startDate || !endDate}
          >
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
            {isLoadingDashboard ? (
              <Box sx={{ position: "relative", height: 200 }}>
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
              </Box>
            ) : (
              <CustomPieChart data={transactionsStatus} />
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
              <Typography variant="h6">
                Status Pengajuan Dibatalkan & Selesai
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#6D788B", fontSize: "10px" }}
              >
                Hingga hari ini
              </Typography>
            </Div>
            {isLoadingDashboard ? (
              <Box sx={{ position: "relative", height: 200 }}>
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
              </Box>
            ) : (
              <CustomPieChart data={wastesData} />
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
              <Typography variant="h6">Jumlah Pengajuan</Typography>
              <Typography
                variant="body1"
                sx={{ color: "#6D788B", fontSize: "10px" }}
              >
                Hingga hari ini
              </Typography>
            </Div>
            {isLoadingDashboard ? (
              <Box sx={{ position: "relative", height: 300 }}>
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
              </Box>
            ) : submissionChartData.length &&
              !isEmpty(submissionOriginalData) ? (
              <CustomGroupedBarChart
                chartId="submissionData"
                generatedData={submissionChartData}
                originalData={submissionOriginalData}
                chartColor="#EA4569"
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: 300,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant={"body1"}
                  fontSize={"14px"}
                  sx={{ color: "#000000" }}
                >
                  Tidak ada data untuk ditampilkan
                </Typography>
              </Box>
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
            {isLoadingDashboard ? (
              <Box sx={{ position: "relative", height: 300 }}>
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
              </Box>
            ) : submissionProcess.length &&
              !isEmpty(submissionOriginalProcess) ? (
              <CustomGroupedBarChart
                chartId="submissionProcess"
                generatedData={submissionProcess}
                originalData={submissionOriginalProcess}
                chartColor={gradientSubmissionColor}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: 300,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant={"body1"}
                  fontSize={"14px"}
                  sx={{ color: "#000000" }}
                >
                  Tidak ada data untuk ditampilkan
                </Typography>
              </Box>
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
            {isLoadingDashboard ? (
              <Box sx={{ position: "relative", height: 300 }}>
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
              </Box>
            ) : submissionChartData.length &&
              !isEmpty(submissionOriginalData) ? (
              <CustomGroupedBarChart
                chartId="wastesCalculation"
                generatedData={wastesChartData}
                chartColor="#98ECFF"
                isGroupped={false}
              />
            ) : null}
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
            {isLoadingDashboard ? (
              <Box sx={{ position: "relative", height: 300 }}>
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
              </Box>
            ) : submissionFinish.length &&
              !isEmpty(submissionOriginalFinish) ? (
              <CustomGroupedBarChart
                chartId="submissionFinish"
                generatedData={submissionFinish}
                originalData={submissionOriginalFinish}
                chartColor={gradientWastesColor}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: 300,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant={"body1"}
                  fontSize={"14px"}
                  sx={{ color: "#000000" }}
                >
                  Tidak ada data untuk ditampilkan
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Stack>
    </Div>
  );
};

export default Home;
