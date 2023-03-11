import React, {
  Fragment,
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { CustomEditIconButton } from "app/components/CustomIconButton";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import useFetch from "app/hooks/useFetch";
import useAxiosFunction from "app/hooks/useAxiosFunction";
import usePrevious from "app/hooks/usePrevious";
import { isEqual } from "lodash";
import DatepickerComponent from "app/components/DatepickerComponent";
import moment from "moment";

const Recaps = () => {
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
        filter: "pengajuan",
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
    filter: "pengajuan",
  });
  const prevParam = usePrevious(requestParam);

  const columns = useMemo(() => {
    return [
      {
        field: "idx",
        headerName: "No",
        renderCell: (index) =>
          rowsPerPage * currentPage + (index.api.getRowIndex(index.row.id) + 1),
      },
      {
        field: "name",
        headerName: "Nama Klien",
        width: 150,
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
      },
      {
        field: "type",
        headerName: "Jenis Limbah",
        width: 150,
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
      },
      {
        field: "period",
        headerName: "Periode",
        width: 150,
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
      },
      {
        field: "driver",
        headerName: "Nama Driver",
        width: 150,
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
      },
      {
        field: "vehicle",
        headerName: "Kendaraan",
        width: 150,
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
      },
      {
        field: "status",
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
          return [
            <CustomEditIconButton
              size="small"
              sx={{ mr: 2 }}
              onClick={() => navigate(`/orders/${params.row.id}/edit`)}
            />,
          ];
        },
        width: 200,
      },
    ];
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    if (recapsData?.orders && recapsData?.paginator) {
      setDatas(recapsData.orders);
      setPagination(recapsData.paginator);
      if (tableRef && tableRef.current) tableRef.current.scrollIntoView();
    }
  }, [recapsData]);

  useEffect(() => {
    if (tableRef && tableRef.current) tableRef.current.scrollIntoView();
  }, []);

  useEffect(() => {
    if (!isEqual(prevParam, requestParam)) {
      refetch({
        params: requestParam,
      });
    }
  }, [requestParam]);

  const onChangePage = useCallback((event, page) => {
    setCurrentPage(page);
    setRequestParam((curr) => ({
      ...curr,
      page: page + 1,
    }));
  }, []);

  const onChangeRowsPerPage = useCallback((pageSize) => {
    setRowsPerPage(pageSize);
    setCurrentPage(0);
    setRequestParam((curr) => ({
      ...curr,
      page: 1,
      limit: pageSize,
    }));
  }, []);

  return (
    <Fragment>
      <Box display="flex" mb={4} alignItems="center">
        <Box flex={3}>
          <ToggleButtonGroup
            color="primary"
            value={requestParam.filter}
            exclusive
            onChange={(event, value) =>
              setRequestParam((curr) => ({
                ...curr,
                filter: value,
              }))
            }
          >
            <ToggleButton value="pengajuan">Pengajuan</ToggleButton>
            <ToggleButton value="process">Proses</ToggleButton>
            <ToggleButton value="waiting_pickup">Waiting Pickup</ToggleButton>
            <ToggleButton value="cancelled">Dibatalkan</ToggleButton>
            <ToggleButton value="done">Selesai</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box flex={1}>
          <DatepickerComponent
            value={requestParam?.date ?? null}
            onChange={(val) =>
              setRequestParam((curr) => ({
                ...curr,
                date: val,
              }))
            }
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

export default Recaps;
