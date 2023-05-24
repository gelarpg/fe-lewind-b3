import React from "react";
import Page from "@jumbo/shared/Page";

const Home = React.lazy(() => import("app/pages/Home"));
const Login = React.lazy(() => import("app/pages/Login"));

const Submissions = React.lazy(() => import("app/pages/Submissions"));
const NewSubmissions = React.lazy(() => import("app/pages/Submissions/new"));
const EditSubmissions = React.lazy(() => import("app/pages/Submissions/edit"));

const Recaps = React.lazy(() => import("app/pages/Recaps"));
const EditRecaps = React.lazy(() => import("app/pages/Recaps/edit"));

const Users = React.lazy(() => import("app/pages/Users"));
const NewUsers = React.lazy(() => import("app/pages/Users/new"));
const EditUsers = React.lazy(() => import("app/pages/Users/edit"));
const DetailUsers = React.lazy(() => import("app/pages/Users/detail"));

const Vehicles = React.lazy(() => import("app/pages/Master/Vehicles"));
const NewVehicles = React.lazy(() => import("app/pages/Master/Vehicles/new"));
const EditVehicles = React.lazy(() => import("app/pages/Master/Vehicles/edit"));

const Wastes = React.lazy(() => import("app/pages/Master/Wastes"));
const NewWastes = React.lazy(() => import("app/pages/Master/Wastes/new"));
const EditWastes = React.lazy(() => import("app/pages/Master/Wastes/edit"));

const Drivers = React.lazy(() => import("app/pages/Master/Drivers"));
const NewDrivers = React.lazy(() => import("app/pages/Master/Drivers/new"));
const EditDrivers = React.lazy(() => import("app/pages/Master/Drivers/edit"));

const Clients = React.lazy(() => import("app/pages/Master/Clients"));
const NewClients = React.lazy(() => import("app/pages/Master/Clients/new"));
const EditClients = React.lazy(() => import("app/pages/Master/Clients/edit"));

const Licenses = React.lazy(() => import("app/pages/Master/Licenses"));
const NewLicenses = React.lazy(() => import("app/pages/Master/Licenses/new"));
const EditLicenses = React.lazy(() => import("app/pages/Master/Licenses/edit"));

const Invoices = React.lazy(() => import("app/pages/Invoices"));
const EditInvoices = React.lazy(() => import("app/pages/Invoices/edit"));

const DailyAccount = React.lazy(() => import("app/pages/DailyAccount"));
const LoginActivity = React.lazy(() => import("app/pages/LoginActivity"));
const GeneratedInvoice = React.lazy(() => import("app/pages/GeneratedInvoice"));

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
    path: "/submissions/:id/edit",
    element: <Page component={EditSubmissions} />,
  },
  {
    path: "/submissions/:id/detail",
    element: <Page component={EditSubmissions} />,
  },

  {
    path: "/orders",
    element: <Page component={Recaps} />,
  },
  {
    path: "/orders/:id/edit",
    element: <Page component={EditRecaps} />,
  },
  {
    path: "/orders/:id/detail",
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
    path: "/vehicles/:id/edit",
    element: <Page component={EditVehicles} />,
  },
  {
    path: "/vehicles/:id/detail",
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
    path: "/wastes/:id/edit",
    element: <Page component={EditWastes} />,
  },
  {
    path: "/wastes/:id/detail",
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
    path: "/drivers/:id/edit",
    element: <Page component={EditDrivers} />,
  },
  {
    path: "/drivers/:id/detail",
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
    path: "/clients/:id/edit",
    element: <Page component={EditClients} />,
  },
  {
    path: "/clients/:id/detail",
    element: <Page component={EditClients} />,
  },

  {
    path: "/licenses",
    element: <Page component={Licenses} />,
  },
  {
    path: "/licenses/new",
    element: <Page component={NewLicenses} />,
  },
  {
    path: "/licenses/:id/edit",
    element: <Page component={EditLicenses} />,
  },
  {
    path: "/licenses/:id/detail",
    element: <Page component={EditLicenses} />,
  },

  {
    path: "/invoices",
    element: <Page component={Invoices} />,
  },
  {
    path: "/invoices/:id/edit",
    element: <Page component={EditInvoices} />,
  },
  {
    path: "/invoices/:id/detail",
    element: <Page component={EditInvoices} />,
  },
  {
    path: "/daily-count",
    element: <Page component={DailyAccount} />,
  },
  {
    path: "/log-activity",
    element: <Page component={LoginActivity} />,
  },
  {
    path: "/generated-invoice",
    element: <Page component={GeneratedInvoice} />,
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