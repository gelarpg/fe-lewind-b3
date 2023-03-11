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
import usePrevious from "app/hooks/usePrevious";
import { withSnackbar } from "app/components/SnackbarComponent";
import {isEqual} from "lodash";

const Wastes = (props) => {
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();
  const {
    isLoading: isLoadingList,
    data: wastesData,
    error: errorWastesData,
    refetch,
  } = useFetch({
    url: "/waste",
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
        headerName: "Nama Limbah",
        width: 200,
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
      },
      {
        field: "type",
        headerName: "Jenis Limbah",
        width: 200,
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
      },
      {
        field: "weight_unit",
        headerName: "Berat Satuan",
        width: 150,
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
      },
      {
        field: "price_unit",
        headerName: "Harga Satuan",
        width: 200,
        valueFormatter: (params) => {
          return `${new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
          }).format(params.value)}`;
        },
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
              onClick={() => navigate(`/wastes/${params.row.id}/edit`)}
            />,
            <CustomDeleteIconButton
              size="small"
              onClick={() => deleteData(params.row.id)}
            />,
          ];
        },
        width: 200,
      },
    ];
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    if (wastesData?.waste && wastesData?.paginator) {
      setDatas(wastesData.waste);
      setPagination(wastesData.paginator);
      if (tableRef && tableRef.current) tableRef.current.scrollIntoView();
    }
  }, [wastesData]);

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

  const deleteData = (id) => {
    axiosFetch({
      method: "delete",
      url: `/waste/delete/${id}`,
      onSuccess: () => {
        props.snackbarShowMessage('Data berhasil dihapus')
        if (requestParam.page === 1) {
          refetch({
            params: {
              page: 1,
              limit: requestParam.limit
            },
          });
        } else {
          setRequestParam((curr) => ({
            ...curr,
            page: 1,
          }));
        }
      },
    });
  };

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
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button
          type="button"
          variant="contained"
          onClick={() => navigate(`/wastes/new`)}
        >
          Tambah Data
        </Button>
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

export default withSnackbar(Wastes);