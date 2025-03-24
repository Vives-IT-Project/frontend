import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "./presentation/layouts/base-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <div>🏠 Home Page</div>,
      },
      {
        path: "/projects",
        element: <div>📂 Projects</div>,
      },
    ],
  },
]);

export default router;
