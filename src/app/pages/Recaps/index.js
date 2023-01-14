import React, {
  Fragment,
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { Button, Box, Typography } from "@mui/material";
import {
  CustomEditIconButton,
  CustomDeleteIconButton,
} from "app/components/CustomIconButton";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import useFetch from "app/hooks/useFetch";
import useAxiosFunction from "app/hooks/useAxiosFunction";

const Recaps = () => {
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();
  const {
    isLoading: isLoadingList,
    data: recapsData,
    error: errorRecapsData,
    refetch,
  } = useFetch({
    method: "get",
    url: "/orders",
    requestConfig: {
      params: {
        page: 1,
        limit: 10,
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
  });

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
    if (recapsData?.drivers && recapsData?.paginator) {
      setDatas(recapsData.drivers);
      setPagination(recapsData.paginator);
      if (tableRef && tableRef.current) tableRef.current.scrollIntoView();
    }
  }, [recapsData]);

  useEffect(() => {
    if (tableRef && tableRef.current) tableRef.current.scrollIntoView();
  }, []);

  useEffect(() => {
    refetch({
      params: requestParam,
    });
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
      {/* <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button
          type="button"
          variant="contained"
          onClick={() => navigate(`/orders/new`)}
        >
          Tambah Data
        </Button>
      </Box> */}
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
