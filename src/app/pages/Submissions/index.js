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

const Submissions = (props) => {
  const {
    isAdminDireksi,
    isAdminOperasional,
    isAdminPerencanaan,
    isSuperAdmin,
  } = props;
  const { isLoading, data, error, axiosFetch } = useAxiosFunction();
  const {
    isLoading: isLoadingList,
    data: submissionData,
    error: errorSubmissionData,
    refetch,
  } = useFetch({
    url: "/submission",
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
  const [fetched, setFetched] = useState(false);
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
        field: "client_name",
        headerName: "Nama Klien",
        flex: 1,
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
      },
      // {
      //   field: "waste_name",
      //   headerName: "Jenis Limbah",
      //   valueFormatter: (params) => params?.value ?? "-",
      //   sortable: false,
      // },
      // {
      //   field: "period",
      //   headerName: "Periode",
      //   valueFormatter: (params) =>
      //     params?.value ? moment(params?.value).format("DD MMMM YYYY") : "-",
      //   sortable: false,
      // },
      // {
      //   field: "driver_name",
      //   headerName: "Nama Driver",
      //   valueFormatter: (params) => params?.value ?? "-",
      //   sortable: false,
      // },
      // {
      //   field: "transportation_name",
      //   headerName: "Kendaraan",
      //   valueFormatter: (params) => params?.value ?? "-",
      //   sortable: false,
      // },
      {
        field: "status_name",
        headerName: "Status",
        flex: 1,
        sortable: false,
      },
      {
        field: "actions",
        headerName: "",
        type: "actions",
        getActions: (params) => {
          let actions = [];
          if (isAdminDireksi) {
            actions = [
              <CustomDetailButton
                size="small"
                onClick={() => navigate(`/submissions/${params.row.id}/detail`)}
              />,
            ];
          } else if (isAdminOperasional || isAdminPerencanaan || isSuperAdmin) {
            actions = [
              <CustomEditIconButton
                size="small"
                sx={{ mr: 1 }}
                onClick={() => navigate(`/submissions/${params.row.id}/edit`)}
              />,
              <CustomDeleteIconButton
                size="small"
                onClick={() => deleteData(params.row.id)}
              />,
            ];
            if (isAdminOperasional || isSuperAdmin) {
              actions.unshift(
                <ApproveIconButton
                  size="small"
                  sx={{ mr: 1 }}
                  onClick={() => approveData(params.row.id)}
                />
              );
            }
          }
          return actions;
        },
        flex: 1,
      },
    ];
  }, [
    currentPage,
    rowsPerPage,
    isAdminDireksi,
    isAdminOperasional,
    isAdminPerencanaan,
    isSuperAdmin,
  ]);

  useEffect(() => {
    if (submissionData?.submission && submissionData?.paginator) {
      setDatas(submissionData.submission);
      setPagination(submissionData.paginator);
      if (tableRef && tableRef.current) tableRef.current.scrollIntoView();
    }
  }, [submissionData]);

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

  const approveData = (id) => {
    axiosFetch({
      method: "put",
      url: `/submission/approval/${id}`,
      onSuccess: () => {
        props.snackbarShowMessage("Data pengajuan berhasil diproses");
        setRequestParam((curr) => ({
          ...curr,
          page: 1,
        }));
        setFetched(true);
      },
    });
  };

  const deleteData = (id) => {
    axiosFetch({
      method: "delete",
      url: `/submission/delete/${id}`,
      onSuccess: () => {
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
            onClick={() => navigate(`/submissions/new`)}
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

export default withRoles(withSnackbar(Submissions));
