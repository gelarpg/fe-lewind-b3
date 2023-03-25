import React, {
  Fragment,
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { Button, Box, Typography, ToggleButtonGroup, ToggleButton } from "@mui/material";
import {
  CustomEditIconButton,
  CustomDeleteIconButton,
} from "app/components/CustomIconButton";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import useFetch from "app/hooks/useFetch";
import useAxiosFunction from "app/hooks/useAxiosFunction";
import usePrevious from "app/hooks/usePrevious";
import {isEqual} from "lodash";
import moment from "moment";
import DatepickerComponent from "app/components/DatepickerComponent";

const Invoices = () => {
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();
  const {
    isLoading: isLoadingList,
    data: invoicesData,
    error: errorInvoicesData,
    refetch,
  } = useFetch({
    url: "/bills",
    requestConfig: {
      params: {
        page: 1,
        limit: 10,
        payment_status: "false",
      },
    },
  });
  const navigate = useNavigate();

  const [datas, setDatas] = useState([]);
  const [pagination, setPagination] = useState({});
  const tableRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [requestParam, setRequestParam] = useState({
    page: 1,
    limit: 10,
    payment_status: "false",
  });
  const [fetched, setFetched] = useState(false);
  const prevParam = usePrevious(requestParam);

  const columns = useMemo(() => {
    return [
      {
        field: "idx",
        headerName: "No",
        renderCell: (index) =>
          rowsPerPage * currentPage + (index.api.getRowIndex(index.row.id) + 1),
        width: 50
      },
      {
        field: "order_id",
        headerName: "No Order",
        width: 200,
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
      },
      {
        field: "client_name",
        headerName: "Nama Klien",
        width: 200,
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
      },
      {
        field: "waste_name",
        headerName: "Jenis Limbah",
        width: 200,
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
      },
      {
        field: "period",
        headerName: "Periode",
        width: 150,
        valueFormatter: (params) => params?.value ? moment(params?.value).format('DD MMMM YYYY') : "-",
        sortable: false,
      },
      {
        field: "driver_name",
        headerName: "Nama Driver",
        width: 200,
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
      },
      {
        field: "transportation_name",
        headerName: "Kendaraan",
        width: 200,
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
      },
      {
        field: "payment_status",
        headerName: "Status",
        width: 200,
        valueFormatter: (params) => Boolean(params?.value) ? "Dibayar" : "Menunggu Pembayaran",
        sortable: false,
      },
      {
        field: "actions",
        headerName: "",
        type: "actions",
        getActions: (params) => {
          return [
            <CustomEditIconButton
              size="small"
              onClick={() => navigate(`/invoices/${params.row.id}/edit`)}
            />,
          ];
        },
        width: 75,
      },
    ];
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    if (invoicesData?.submission && invoicesData?.paginator) {
      setDatas(invoicesData.submission);
      setPagination(invoicesData.paginator);
      if (tableRef && tableRef.current) tableRef.current.scrollIntoView();
    }
  }, [invoicesData]);

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

  const onChangePage = useCallback((event, page) => {
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

  return (
    <Fragment>
      <Box display="flex" mb={4}>
        <Box flex={3}>
          <ToggleButtonGroup
            color="primary"
            value={requestParam?.payment_status}
            exclusive
            onChange={(event, value) => {
              setRequestParam(curr => ({
                ...curr,
                payment_status: value
              }));
              setFetched(true);
            }}
          >
            <ToggleButton value="false">Menunggu Pembayaran</ToggleButton>
            <ToggleButton value="true">Dibayar</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box flex={1}>
          <DatepickerComponent
            value={requestParam?.date ?? null}
            onChange={(val) => {
              if (val) {
                setRequestParam((curr) => ({
                  ...curr,
                  date: moment(val).format('YYYY-MM-DD'),
                }));
                setFetched(true);
              } else {
                setRequestParam((curr) => ({
                  ...curr,
                  date: undefined,
                }));
                setFetched(true);
              }
            }}
            onClear={() => {
              setRequestParam((curr) => ({
                ...curr,
                date: undefined,
              }));
              setFetched(true);
            }}
            disableFuture
            placeholder="Pilih Tanggal"
          />
        </Box>
      </Box>
      <DataGrid
        ref={tableRef}
        disableColumnMenu
        disableSelectionOnClick
        autoHeight
        disableColumnReorder
        rowHeight={100}
        getRowId={(row) => row.id}
        columns={columns}
        rows={datas}
        onPageChange={onChangePage}
        onPageSizeChange={onChangeRowsPerPage}
        page={currentPage}
        pageSize={rowsPerPage}
        loading={isLoadingList}
        // paginationMode="server"
        rowCount={pagination?.itemCount ?? 10}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </Fragment>
  );
};

export default Invoices;
