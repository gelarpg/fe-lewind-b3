import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as Email } from "app/assets/icons/email.svg";
import { ReactComponent as Graph } from "app/assets/icons/graph.svg";
import { ReactComponent as Options } from "app/assets/icons/options.svg";
import { ReactComponent as Growth } from "app/assets/icons/growth.svg";

const menus = [
  {
    uri: "/dashboard",
    label: "Dashboard",
    type: "nav-item",
    icon: (
      <SvgIcon sx={{ fontSize: 20 }} viewBox="0 0 20 20">
        <Graph />
      </SvgIcon>
    ),
  },
  {
    label: "Master Data",
    type: "section",
    children: [
      {
        label: "Master Data",
        type: "collapsible",
        icon: <AccountCircleOutlinedIcon sx={{ fontSize: 20 }} />,
        children: [
          {
            uri: "/vehicles",
            label: "Kendaraan",
            type: "nav-item",
          },
          {
            uri: "/drivers",
            label: "Driver",
            type: "nav-item",
          },
          {
            uri: "/wastes",
            label: "Limbah",
            type: "nav-item",
          },
        ],
      },
    ],
  },
  {
    uri: "/submissions",
    label: "Pengajuan",
    type: "nav-item",
    icon: (
    <ContentPasteOutlinedIcon sx={{ fontSize: 20 }} />
    ),
  },
  {
    uri: "/orders",
    label: "Rekap Order",
    type: "nav-item",
    icon: (
    <SvgIcon sx={{ fontSize: 20 }} viewBox="0 0 20 20">
        <Growth />
      </SvgIcon>
    ),
  },
  {
    uri: "/invoices",
    label: "Tagihan",
    type: "nav-item",
    icon: (
    <SvgIcon sx={{ fontSize: 20 }} viewBox="0 0 20 20">
        <Email />
      </SvgIcon>
    ),
  },
  {
    uri: "/users",
    label: "User Management",
    type: "nav-item",
    icon: (
    <SvgIcon sx={{ fontSize: 20 }} viewBox="0 0 20 20">
        <Options />
      </SvgIcon>
    ),
  },
];

export default menus;
