import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "./presentation/layouts/base-layout";
import Home from "./presentation/pages/home";
import BusinessCases from "./presentation/pages/business-cases";
import GeneralSettings from "./presentation/pages/general-settings";
import Login from "./presentation/pages/login";
import Register from "./presentation/pages/register";
import Complexity from "./presentation/pages/complexity/complexity"
import NewComplexity from "./presentation/pages/complexity/new-complexity"

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
        path: "/new-complexity",
        element: (
          <div>
            <NewComplexity />
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
