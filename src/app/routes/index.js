import React from "react";
import Page from "@jumbo/shared/Page";

import Home from "app/pages/Home";
import Login from "app/pages/Login";
import Submissions from "app/pages/Submissions";
import Recaps from "app/pages/Recaps";
import Users from "app/pages/Users";
import Vehicles from "app/pages/Master/Vehicles";
import Wastes from "app/pages/Master/Wastes";
import Drivers from "app/pages/Master/Drivers";
import Invoices from "app/pages/Invoices";

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
    path: "/recaps",
    element: <Page component={Recaps} />,
  },
  {
    path: "/users",
    element: <Page component={Users} />,
  },
  {
    path: "/vehicles",
    element: <Page component={Vehicles} />,
  },
  {
    path: "/wastes",
    element: <Page component={Wastes} />,
  },
  {
    path: "/drivers",
    element: <Page component={Drivers} />,
  },
  {
    path: "/invoices",
    element: <Page component={Invoices} />,
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