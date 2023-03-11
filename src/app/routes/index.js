import React from "react";
import Page from "@jumbo/shared/Page";

const Home = React.lazy(() => import("app/pages/Home"));
const Login = React.lazy(() => import("app/pages/Login"));

const Submissions = React.lazy(() => import("app/pages/Submissions"));
const NewSubmissions = React.lazy(() => import("app/pages/Submissions/new"));
const EditSubmissions = React.lazy(() => import("app/pages/Submissions/edit"));
const DetailSubmissions = React.lazy(() => import("app/pages/Submissions/detail"));

const Recaps = React.lazy(() => import("app/pages/Recaps"));
const NewRecaps = React.lazy(() => import("app/pages/Recaps/new"));
const EditRecaps = React.lazy(() => import("app/pages/Recaps/edit"));
const DetailRecaps = React.lazy(() => import("app/pages/Recaps/detail"));

const Users = React.lazy(() => import("app/pages/Users"));
const NewUsers = React.lazy(() => import("app/pages/Users/new"));
const EditUsers = React.lazy(() => import("app/pages/Users/edit"));
const DetailUsers = React.lazy(() => import("app/pages/Users/detail"));

const Vehicles = React.lazy(() => import("app/pages/Master/Vehicles"));
const NewVehicles = React.lazy(() => import("app/pages/Master/Vehicles/new"));
const EditVehicles = React.lazy(() => import("app/pages/Master/Vehicles/edit"));
const DetailVehicles = React.lazy(() => import("app/pages/Master/Vehicles/detail"));

const Wastes = React.lazy(() => import("app/pages/Master/Wastes"));
const NewWastes = React.lazy(() => import("app/pages/Master/Wastes/new"));
const EditWastes = React.lazy(() => import("app/pages/Master/Wastes/edit"));
const DetailWastes = React.lazy(() => import("app/pages/Master/Wastes/detail"));

const Drivers = React.lazy(() => import("app/pages/Master/Drivers"));
const NewDrivers = React.lazy(() => import("app/pages/Master/Drivers/new"));
const EditDrivers = React.lazy(() => import("app/pages/Master/Drivers/edit"));
const DetailDrivers = React.lazy(() => import("app/pages/Master/Drivers/detail"));

const Clients = React.lazy(() => import("app/pages/Master/Clients"));
const NewClients = React.lazy(() => import("app/pages/Master/Clients/new"));
const EditClients = React.lazy(() => import("app/pages/Master/Clients/edit"));
const DetailClients = React.lazy(() => import("app/pages/Master/Clients/detail"));

const Invoices = React.lazy(() => import("app/pages/Invoices"));
const NewInvoices = React.lazy(() => import("app/pages/Invoices/new"));
const EditInvoices = React.lazy(() => import("app/pages/Invoices/edit"));
const DetailInvoices = React.lazy(() => import("app/pages/Invoices/detail"));

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