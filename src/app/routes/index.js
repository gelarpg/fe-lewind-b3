import React from "react";
import Page from "@jumbo/shared/Page";

import Home from "app/pages/Home";
import Login from "app/pages/Login";

import Submissions from "app/pages/Submissions";
import NewSubmissions from "app/pages/Submissions/new";
import EditSubmissions from "app/pages/Submissions/edit";
import DetailSubmissions from "app/pages/Submissions/detail";

import Recaps from "app/pages/Recaps";
import NewRecaps from "app/pages/Recaps/new";
import EditRecaps from "app/pages/Recaps/edit";
import DetailRecaps from "app/pages/Recaps/detail";

import Users from "app/pages/Users";
import NewUsers from "app/pages/Users/new";
import EditUsers from "app/pages/Users/edit";
import DetailUsers from "app/pages/Users/detail";

import Vehicles from "app/pages/Master/Vehicles";
import NewVehicles from "app/pages/Master/Vehicles/new";
import EditVehicles from "app/pages/Master/Vehicles/edit";
import DetailVehicles from "app/pages/Master/Vehicles/detail";

import Wastes from "app/pages/Master/Wastes";
import NewWastes from "app/pages/Master/Wastes/new";
import EditWastes from "app/pages/Master/Wastes/edit";
import DetailWastes from "app/pages/Master/Wastes/detail";

import Drivers from "app/pages/Master/Drivers";
import NewDrivers from "app/pages/Master/Drivers/new";
import EditDrivers from "app/pages/Master/Drivers/edit";
import DetailDrivers from "app/pages/Master/Drivers/detail";

import Clients from "app/pages/Master/Clients";
import NewClients from "app/pages/Master/Clients/new";
import EditClients from "app/pages/Master/Clients/edit";
import DetailClients from "app/pages/Master/Clients/detail";

import Invoices from "app/pages/Invoices";
import NewInvoices from "app/pages/Invoices/new";
import EditInvoices from "app/pages/Invoices/edit";
import DetailInvoices from "app/pages/Invoices/detail";

/**
 routes which you want to make accessible to both authenticated and anonymous users
 **/
const routesForPublic = [];

/**
 routes only accessible to authenticated users
 **/
const routesForAuthenticatedOnly = [
  {
    path: "/",
    element: <Page component={Home} />,
  },
  {
    path: "/dashboard",
    element: <Page component={Home} />,
  },

  {
    path: "/submissions",
    element: <Page component={Submissions} />,
  },
  {
    path: "/submissions/new",
    element: <Page component={NewSubmissions} />,
  },
  {
    path: "/submissions/:id",
    element: <Page component={DetailSubmissions} />,
  },
  {
    path: "/submissions/:id/edit",
    element: <Page component={EditSubmissions} />,
  },

  {
    path: "/orders",
    element: <Page component={Recaps} />,
  },
  {
    path: "/orders/new",
    element: <Page component={NewRecaps} />,
  },
  {
    path: "/orders/:id",
    element: <Page component={DetailRecaps} />,
  },
  {
    path: "/orders/:id/edit",
    element: <Page component={EditRecaps} />,
  },

  {
    path: "/users",
    element: <Page component={Users} />,
  },
  {
    path: "/users/new",
    element: <Page component={NewUsers} />,
  },
  {
    path: "/users/:id",
    element: <Page component={DetailUsers} />,
  },
  {
    path: "/users/:id/edit",
    element: <Page component={EditUsers} />,
  },

  {
    path: "/vehicles",
    element: <Page component={Vehicles} />,
  },
  {
    path: "/vehicles/new",
    element: <Page component={NewVehicles} />,
  },
  {
    path: "/vehicles/:id",
    element: <Page component={DetailVehicles} />,
  },
  {
    path: "/vehicles/:id/edit",
    element: <Page component={EditVehicles} />,
  },

  {
    path: "/wastes",
    element: <Page component={Wastes} />,
  },
  {
    path: "/wastes/new",
    element: <Page component={NewWastes} />,
  },
  {
    path: "/wastes/:id",
    element: <Page component={DetailWastes} />,
  },
  {
    path: "/wastes/:id/edit",
    element: <Page component={EditWastes} />,
  },

  {
    path: "/drivers",
    element: <Page component={Drivers} />,
  },
  {
    path: "/drivers/new",
    element: <Page component={NewDrivers} />,
  },
  {
    path: "/drivers/:id",
    element: <Page component={DetailDrivers} />,
  },
  {
    path: "/drivers/:id/edit",
    element: <Page component={EditDrivers} />,
  },

  {
    path: "/clients",
    element: <Page component={Clients} />,
  },
  {
    path: "/clients/new",
    element: <Page component={NewClients} />,
  },
  {
    path: "/clients/:id",
    element: <Page component={DetailClients} />,
  },
  {
    path: "/clients/:id/edit",
    element: <Page component={EditClients} />,
  },

  {
    path: "/invoices",
    element: <Page component={Invoices} />,
  },
  {
    path: "/invoices/new",
    element: <Page component={NewInvoices} />,
  },
  {
    path: "/invoices/:id",
    element: <Page component={DetailInvoices} />,
  },
  {
    path: "/invoices/:id/edit",
    element: <Page component={EditInvoices} />,
  },
];

/**
 routes only accessible when user is anonymous
 **/
const routesForNotAuthenticatedOnly = [
  {
    path: "/login",
    element: <Page layout="solo-page" component={Login} />,
  },
];

const routes = [
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
    ...routesForNotAuthenticatedOnly,
];

export {routes as default, routesForPublic, routesForNotAuthenticatedOnly, routesForAuthenticatedOnly};