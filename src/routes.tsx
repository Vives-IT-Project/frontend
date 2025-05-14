import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "./presentation/layouts/base-layout";
import Home from "./presentation/pages/home";
import BusinessCases from "./presentation/pages/business-cases";
import GeneralSettings from "./presentation/pages/general-settings";
import Login from "./presentation/pages/login";
import Register from "./presentation/pages/register";
import Complexity from "./presentation/pages/complexity/complexity"
import BusinessCaseComplexity from "./presentation/pages/business-case-complexity";
import ManageTemplate from "./presentation/pages/business-cases-manage-template";
import NewTemplate from "./presentation/pages/business-cases-new-template";
import CreateBusinessCase from "./presentation/pages/new-business-cases";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/business-cases",
        element: (
          <div>
            <BusinessCases />
          </div>
        ),
      },
      {
        path: "/manage-templates",
        element: (
          <div>
            <ManageTemplate />
          </div>
        ),
      },
      {
        path: "/new-business-case",
        element: (
          <div>
            <CreateBusinessCase />
          </div>
        ),
      },
      {
        path: "/new-template",
        element: (
          <div>
            <NewTemplate />
          </div>
        ),
      },
      {
        path: "/app-settings",
        element: (
          <div>
            <GeneralSettings />
          </div>
        ),
      },
      {
        path: "/complexity",
        element: (
          <div>
            <Complexity />
          </div>
        ),
      },
      {
        path: "/business-case-complexity",
        element: (
          <div>
            <BusinessCaseComplexity />
          </div>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
