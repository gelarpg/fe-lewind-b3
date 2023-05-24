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
  CustomDetailButton,
} from "app/components/CustomIconButton";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import useFetch from "app/hooks/useFetch";
import useAxiosFunction from "app/hooks/useAxiosFunction";
import usePrevious from "app/hooks/usePrevious";
import { withSnackbar } from "app/components/SnackbarComponent";
import { withRoles } from "app/components/withRoles";
import moment from "moment";

const Licenses = (props) => {
  const {isAdminDireksi, isSuperAdmin, isAdminPerencanaan} = props;
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();
  const {
    isLoading: isLoadingList,
    data: vehiclesData,
    error: errorvehiclesData,
    refetch,
  } = useFetch({
    url: "/transportation-license",
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
  const [fetched, setFetched] = useState(false);
  const prevParam = usePrevious(requestParam);

  const columns = useMemo(() => {
    return [
      {
        field: "idx",
        headerName: "No",
        renderCell: (index) =>
          rowsPerPage * currentPage + (index.api.getRowIndex(index.row.id) + 1),
        width: 50,
      },
      {
        field: "name",
        headerName: "Nama Kendaraan",
        width: 250,
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
      },
      {
        field: "no_police",
        headerName: "No Polisi",
        width: 100,
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
      },
      {
        field: "validity_period_stnk",
        headerName: "Masa Berlaku Pajak STNK",
        width: 250,
        valueFormatter: (params) => params?.value ? moment(params?.value).format('DD MMMM YYYY') : "-",
        sortable: false,
      },
      {
        field: "validity_period_kir",
        headerName: "Masa Berlaku KIR",
        width: 150,
        valueFormatter: (params) => params?.value ? moment(params?.value).format('DD MMMM YYYY') : "-",
        sortable: false,
      },
      {
        field: "validity_period_rekom",
        headerName: "Masa Berlaku Rekom",
        width: 200,
        valueFormatter: (params) => params?.value ? moment(params?.value).format('DD MMMM YYYY') : "-",
        sortable: false,
      },
      {
        field: "validity_period_supervision_card",
        headerName: "Masa Berlaku Kartu Pengawasan",
        width: 250,
        valueFormatter: (params) => params?.value ? moment(params?.value).format('DD MMMM YYYY') : "-",
        sortable: false,
      },
      {
        field: "validity_period_departement_permit",
        headerName: "Masa Berlaku Izin Dinas Perhubungan",
        width: 300,
        valueFormatter: (params) => params?.value ? moment(params?.value).format('DD MMMM YYYY') : "-",
        sortable: false,
      },
      {
        field: "actions",
        headerName: "",
        type: "actions",
        getActions: (params) => {
          if (isAdminDireksi) return [
            <CustomDetailButton
              size="small"
              onClick={() => navigate(`/licenses/${params.row.id}/detail`)}
            />
          ];
          if (isSuperAdmin || isAdminPerencanaan) return [
            <CustomEditIconButton
              size="small"
              sx={{ mr: 2 }}
              onClick={() => navigate(`/licenses/${params.row.id}/edit`)}
            />,
            <CustomDeleteIconButton
              size="small"
              onClick={() => deleteData(params.row.id)}
            />,
          ];
          return [];
        },
        width: 200,
      },
    ];
  }, [currentPage, rowsPerPage, isAdminDireksi, isSuperAdmin, isAdminPerencanaan]);

  useEffect(() => {
    if (vehiclesData?.transportation_license && vehiclesData?.paginator) {
      setDatas(vehiclesData.transportation_license);
      setPagination(vehiclesData.paginator);
      if (tableRef && tableRef.current) tableRef.current.scrollIntoView();
    }
  }, [vehiclesData]);

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
  }, [fetched, requestParam]);

  const deleteData = (id) => {
    axiosFetch({
      method: "delete",
      url: `/transportation-license/delete/${id}`,
      onSuccess: () => {
        props.snackbarShowMessage('Data berhasil dihapus')
        setRequestParam((curr) => ({
          ...curr,
          page: 1,
        }));
        setFetched(true);
      },
    });
  };

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
      <Box display="flex" justifyContent="flex-end" mb={4}>
      {isSuperAdmin || isAdminPerencanaan ? (
          <Button
            type="button"
            variant="contained"
            onClick={() => navigate(`/licenses/new`)}
          >
            Tambah Data
          </Button>
        ) : null}
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

export default withRoles(withSnackbar(Licenses));
