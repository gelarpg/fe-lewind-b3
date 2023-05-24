import React, {
  Fragment,
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { Button, Box, Checkbox, TextField, Grid, Stack } from "@mui/material";
import {
  CustomEditIconButton,
  CustomDeleteIconButton,
  ApproveIconButton,
  CustomDetailButton,
} from "app/components/CustomIconButton";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import useFetch from "app/hooks/useFetch";
import useAxiosFunction from "app/hooks/useAxiosFunction";
import usePrevious from "app/hooks/usePrevious";
import { isEqual } from "lodash";
import moment from "moment";
import { withSnackbar } from "app/components/SnackbarComponent";
import { withRoles } from "app/components/withRoles";
import DatepickerComponent from "app/components/DatepickerComponent";

const DailyAccount = (props) => {
  const {
    isAdminDireksi,
    isAdminOperasional,
    isAdminPerencanaan,
    isSuperAdmin,
  } = props;
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();
  const {
    isLoading: isLoadingList,
    data: dailyAccounts,
    error: errorDailyAccounts,
    refetch,
  } = useFetch({
    url: "/daily-count",
    requestConfig: {
      params: {
        page: 1,
        limit: 10,
      },
    },
  });
  const navigate = useNavigate();

  const [datas, setDatas] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pagination, setPagination] = useState({});
  const tableRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [fetched, setFetched] = useState(false);
  const [requestParam, setRequestParam] = useState({
    page: 1,
    limit: 10,
  });
  const [checkedItems, setCheckedItems] = useState([]);
  const prevParam = usePrevious(requestParam);

  const onCheckItems = useCallback((e, id) => {
    setCheckedItems((curr) => {
      if (curr.findIndex((x) => Number(x) === Number(id)) > -1) {
        const newItems = curr.filter((x) => Number(x) !== Number(id));
        return newItems;
      } else {
        return [...curr, id];
      }
    });
  }, []);

  const columns = useMemo(() => {
    return [
      {
        field: "id",
        headerName: "",
        renderCell: (params) => (
          <Checkbox
            checked={
              checkedItems.findIndex(
                (x) => Number(x) === Number(params?.value)
              ) > -1
            }
            onChange={(e) => onCheckItems(e, params?.value)}
          />
        ),
        width: 50,
      },
      {
        field: "idx",
        headerName: "No",
        renderCell: (index) =>
          rowsPerPage * currentPage + (index.api.getRowIndex(index.row.id) + 1),
        width: 50,
      },
      {
        field: "client_company_name",
        headerName: "Nama Klien",
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
        width: 200,
      },
      {
        field: "period",
        headerName: "Periode",
        valueFormatter: (params) =>
          params?.value ? moment(params?.value).format("DD-MM-YYYY") : "-",
        sortable: false,
        width: 100,
      },
      {
        field: "transportation_no_police",
        headerName: "No. Polisi",
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
        width: 150,
      },
      {
        field: "driver_name",
        headerName: "Nama Driver",
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
        width: 200,
      },
      {
        field: "transport_target",
        headerName: "Purpose",
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
        width: 200,
      },
      {
        field: "waste_name",
        headerName: "Waste",
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
        width: 250,
      },
      {
        field: "qty",
        headerName: "Quantity",
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
        width: 100,
      },
      {
        field: "doc_number",
        headerName: "No. Dokumen",
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
        width: 200,
      },
    ];
  }, [currentPage, rowsPerPage, checkedItems, onCheckItems]);

  useEffect(() => {
    if (dailyAccounts?.submission && dailyAccounts?.paginator) {
      setDatas(dailyAccounts.submission);
      setPagination(dailyAccounts.paginator);
      if (tableRef && tableRef.current) tableRef.current.scrollIntoView();
    }
  }, [dailyAccounts]);

  useEffect(() => {
    if (tableRef && tableRef.current) tableRef.current.scrollIntoView();
  }, []);

  useEffect(() => {
    if (fetched) {
      refetch({
        params: requestParam,
      });
      setFetched(false);
    }
  }, [fetched]);

  const onChangePage = useCallback((page) => {
    setCurrentPage(page);
    setRequestParam((curr) => ({
      ...curr,
      page: page + 1,
    }));
    setFetched(true);
  }, []);

  const onChangeRowsPerPage = useCallback((pageSize) => {
    setRowsPerPage(pageSize);
    setCurrentPage(0);
    setRequestParam((curr) => ({
      ...curr,
      page: 1,
      limit: pageSize,
    }));
    setFetched(true);
  }, []);

  const onClickFilter = () => {
    if (startDate) {
      if (!endDate) {
        props.snackbarShowMessage(
          "Pilih Tanggal Akhir terlebih dahulu",
          "error"
        );
        return;
      }
    }
    setCurrentPage(0);
    setRequestParam((curr) => ({
      ...curr,
      page: 1,
      start_date: startDate
        ? moment(startDate).format("YYYY-MM-DD")
        : undefined,
      end_date: endDate ? moment(endDate).format("YYYY-MM-DD") : undefined,
      keyword: keyword ?? undefined,
    }));
    setFetched(true);
  };

  const onGenerateInvoice = useCallback(() => {
    const temp = {
      id: checkedItems,
    };
    axiosFetch({
      method: "post",
      url: "/daily-count/generate-invoice",
      requestConfig: {
        data: temp,
      },
      onSuccess: () => {
        props.snackbarShowMessage("Invoice telah berhasil di generate");
        setTimeout(() => navigate("/generated-invoice"), 1500);
      },
    });
  }, [checkedItems]);

  return (
    <Fragment>
      <Grid container spacing={2} mb={4} alignItems="center">
        <Grid item>
          <TextField
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            size="medium"
            fullWidth
            placeholder="Cari Nama Klien ..."
          />
        </Grid>
        <Grid item>
          <DatepickerComponent
            placeholder="Tanggal Mulai"
            value={startDate}
            onChange={setStartDate}
          />
        </Grid>
        <Grid item>
          <DatepickerComponent
            placeholder="Tanggal Akhir"
            value={endDate}
            disabled={!startDate}
            onChange={setEndDate}
            minDate={moment(startDate).toDate()}
          />
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={2}>
            <Button
              type="button"
              variant="contained"
              onClick={onClickFilter}
              disabled={!startDate && !endDate && !keyword}
            >
              Filter
            </Button>
            {startDate || endDate || keyword ? (
              <Button
                type="button"
                variant="contained"
                sx={{
                  backgroundColor: "gray",
                  color: "#fff",
                  ":hover": {
                    backgroundColor: "gray",
                    color: "#fff",
                  },
                }}
                onClick={() => {
                  setStartDate(null);
                  setEndDate(null);
                  setKeyword("");
                  setRequestParam((curr) => ({
                    ...curr,
                    page: 1,
                    start_date: undefined,
                    end_date: undefined,
                    keyword: "",
                  }));
                  setCurrentPage(0);
                  setFetched(true);
                }}
              >
                Reset
              </Button>
            ) : null}
          </Stack>
        </Grid>
      </Grid>
      {checkedItems.length > 0 && props?.isAdminPerencanaan && (
        <Box width={1} display="flex" justifyContent="flex-end">
          <Button
            type="button"
            variant="contained"
            onClick={onGenerateInvoice}
            disabled={isLoading}
          >
            Generate Invoice
          </Button>
        </Box>
      )}
      <DataGrid
        ref={tableRef}
        disableColumnMenu
        disableSelectionOnClick
        autoHeight
        disableColumnReorder
        rowHeight={100}
        getRowId={(row) => row.id}
        columns={isAdminPerencanaan ? columns : columns.filter(x => x.field !== "id")}
        rows={datas}
        onPageChange={onChangePage}
        onPageSizeChange={onChangeRowsPerPage}
        page={currentPage}
        pageSize={rowsPerPage}
        loading={isLoadingList}
        paginationMode="server"
        rowCount={pagination?.itemCount ?? 10}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </Fragment>
  );
};

export default withRoles(withSnackbar(DailyAccount));
