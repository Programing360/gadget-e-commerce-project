import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../component/Home/Home/home";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        Component: Home,
      },
    ],
  },
]);
