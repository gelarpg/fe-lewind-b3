import React, { Fragment, useState, useCallback } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CustomTableComponent from "app/components/CustomTableComponent";
import Div from "@jumbo/shared/Div";
import {
  CustomEditIconButton,
  CustomDeleteIconButton,
} from "app/components/CustomIconButton";

const columns = [
  {
    dataIndex: "idx",
    title: "No",
    render: (idx, record, key) => key + 1,
  },
  {
    dataIndex: "name",
    title: "Nama Client",
    render: (name) => name,
  },
  {
    dataIndex: "offeringNumber",
    title: "Nomor Penawaran",
    render: (offeringNumber) => offeringNumber,
  },
  {
    dataIndex: "transportCost",
    title: "Biaya Transportasi",
    render: (transportCost) => transportCost,
  },
  {
    dataIndex: "address",
    title: "Alamat",
    render: (address) => (
      <Typography variant="body1" noWrap sx={{ maxWidth: 200 }}>
        {address}
      </Typography>
    ),
  },
  {
    dataIndex: "action",
    title: "",
    render: (action) => (
      <Div sx={{ display: "flex", justifyContent: "center" }}>
        <CustomEditIconButton size="small" />
        <CustomDeleteIconButton size="small" />
      </Div>
    ),
  },
];

const datas = Array.from(Array(25)).map((x, idx) => ({
  name: "PT. GreenFields Indonesia",
  offeringNumber: "302/PBL/LWD/IV/2020",
  transportCost: 7500000,
  address: "Jl. Soekarno Hatta No 23 Desa Babakan Ciparay Kec. Babakan Ciparay Kab. Babakan Kota Bandung Jawa Barat",
}));

const Clients = () => {
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

export default Clients;
