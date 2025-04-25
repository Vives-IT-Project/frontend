import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "./presentation/layouts/base-layout";
import Home from "./presentation/pages/home";
import BusinessCases from "./presentation/pages/business-cases";
import GeneralSettings from "./presentation/pages/general-settings";
import Login from "./presentation/pages/login";

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
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
