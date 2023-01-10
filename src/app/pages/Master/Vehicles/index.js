import React, { Fragment, useState, useCallback } from "react";
import Button from "@mui/material/Button";
import CustomTableComponent from "app/components/CustomTableComponent";
import Div from "@jumbo/shared/Div";
import { CustomEditIconButton, CustomDeleteIconButton } from "app/components/CustomIconButton";

const columns = [
  {
    dataIndex: "idx",
    title: "No",
    render: (idx, record, key) => key + 1,
  },
  {
    dataIndex: "name",
    title: "Nama Kendaraan",
    render: (name) => name,
  },
  {
    dataIndex: "type",
    title: "Jenis Kendaraan",
    render: (type) => type,
  },
  {
    dataIndex: "police_number",
    title: "No Pol",
    render: (police_number) => police_number,
  },
  {
    dataIndex: "year",
    title: "Tahun Kendaraan",
    render: (year) => year,
  },
  {
    dataIndex: "action",
    title: "",
    render: (year) => (
      <Div sx={{ display: "flex", justifyContent: "center" }}>
        <CustomEditIconButton size="small" />
        <CustomDeleteIconButton size="small" />
      </Div>
    ),
  },
];

const datas = Array.from(Array(25)).map((x, idx) => ({
  name: "Dump Truck",
  type: "Hino",
  police_number: "W 8474 UT",
  year: 2022,
}));

const Vehicles = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const onChangePage = useCallback((event, page) => {
    setCurrentPage(page);
  }, []);

  const onChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  }, []);

  return (
    <Fragment>
      <Div sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
        <Button type="button" variant="contained">
          Tambah Data
        </Button>
      </Div>
      <CustomTableComponent
        dataSource={datas}
        columns={columns}
        page={currentPage}
        rowsPerPage={rowsPerPage}
        handleChangePage={onChangePage}
        handleChangeRowsPerPage={onChangeRowsPerPage}
      />
    </Fragment>
  );
};

export default Vehicles;
