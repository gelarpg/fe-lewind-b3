import React, {
  Fragment,
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { DataGrid } from "@mui/x-data-grid";
import useFetch from "app/hooks/useFetch";
import { withSnackbar } from "app/components/SnackbarComponent";
import { withRoles } from "app/components/withRoles";

const LoginActivity = (props) => {
  const {
    isLoading: isLoadingList,
    data: loginActivityData,
    error: errorLoginActivityData,
    refetch,
  } = useFetch({
    url: "/activity-log",
    requestConfig: {
      params: {
        page: 1,
        limit: 10,
      },
    },
  });

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

  const columns = useMemo(() => {
    return [
      {
        field: "idx",
        headerName: "No",
        renderCell: (index) =>
          rowsPerPage * currentPage + (index.api.getRowIndex(index.row.id) + 1),
        flex: 0.5,
      },
      {
        field: "ip",
        headerName: "IP Address",
        flex: 1,
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
      },
      {
        field: "description",
        headerName: "Deskripsi",
        flex: 2,
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
      },
      {
        field: "error_detail",
        headerName: "Error",
        flex: 2,
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
      },
      {
        field: "user_agent",
        headerName: "User Agent",
        flex: 2,
        valueFormatter: (params) => params?.value ?? "-",
        sortable: false,
      },
    ];
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    if (loginActivityData?.activity_log && loginActivityData?.paginator) {
      setDatas(loginActivityData.activity_log);
      setPagination(loginActivityData.paginator);
      if (tableRef && tableRef.current) tableRef.current.scrollIntoView();
    }
  }, [loginActivityData]);

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

export default withRoles(withSnackbar(LoginActivity));
