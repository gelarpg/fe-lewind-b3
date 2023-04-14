import React, {
  Fragment,
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { CustomDetailButton, CustomEditIconButton } from "app/components/CustomIconButton";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import useFetch from "app/hooks/useFetch";
import useAxiosFunction from "app/hooks/useAxiosFunction";
import usePrevious from "app/hooks/usePrevious";
import { isEqual } from "lodash";
import DatepickerComponent from "app/components/DatepickerComponent";
import moment from "moment";
import { withRoles } from "app/components/withRoles";

const Recaps = (props) => {
  const {isAdminDireksi, isAdminOperasional, isSuperAdmin} = props;
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();
  const {
    isLoading: isLoadingList,
    data: recapsData,
    error: errorRecapsData,
    refetch,
  } = useFetch({
    url: "/orders",
    requestConfig: {
      params: {
        page: 1,
        limit: 10,
        status: "2",
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
    status: "2",
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
        field: "status_name",
        headerName: "Status",
        width: 150,
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
      },
      {
        field: "actions",
        headerName: "",
        type: "actions",
        getActions: (params) => {
          let arr = [];
          if (isAdminOperasional || isSuperAdmin) arr = [
            <CustomEditIconButton
              size="small"
              onClick={() => navigate(`/orders/${params.row.id}/edit`)}
            />,
          ];
          if (params.row.status.toString() === "5" || isAdminDireksi) arr = [
            <CustomDetailButton
              size="small"
              onClick={() => navigate(`/orders/${params.row.id}/detail`)}
            />
          ];
          return arr;
        },
        width: 75,
      },
    ];
  }, [currentPage, rowsPerPage, isAdminDireksi, isAdminOperasional, isSuperAdmin]);

  useEffect(() => {
    if (recapsData?.submission && recapsData?.paginator) {
      setDatas(recapsData.submission);
      setPagination(recapsData.paginator);
      if (tableRef && tableRef.current) tableRef.current.scrollIntoView();
    }
  }, [recapsData]);

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

  return (
    <Fragment>
      <Box display="flex" mb={4} alignItems="center">
        <Box flex={3}>
          <ToggleButtonGroup
            color="primary"
            value={requestParam.status}
            exclusive
            onChange={(event, value) => {
              setRequestParam((curr) => ({
                ...curr,
                status: value,
              }));
              setFetched(true);
            }}
          >
            <ToggleButton value="2">Proses</ToggleButton>
            <ToggleButton value="3">Waiting Pickup</ToggleButton>
            <ToggleButton value="4">Pickup</ToggleButton>
            <ToggleButton value="5">Selesai</ToggleButton>
            <ToggleButton value="6">Dibatalkan</ToggleButton>
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
        paginationMode="server"
        rowCount={pagination?.itemCount ?? 10}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </Fragment>
  );
};

export default withRoles(Recaps);
