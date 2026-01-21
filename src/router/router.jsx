import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../component/Home/Home/home";
import ProductDetails from "../page/ProductDetails/ProductDetails";
import Login from "../Authentication/Login";
import SignIn from "../Authentication/SignIn";
import AdminPage from "../mainLayout/DashBoard/AdminPage";
import CartDetails from "../page/AddToCart/CartDetails";
import AddToWishlist from "../page/AddToWishlist/AddToWishlist";
import ProductList from "../mainLayout/DashBoard/ProductList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/productDetails/:id",
        Component: ProductDetails,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/allProduct/${params.id}`),
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: SignIn,
      },
      {
        path: "/cartDetails",
        Component: CartDetails,
      },
      {
        path: "/wishList",
        Component: AddToWishlist,
      },
    ],
  },
  {
    path: "/adminDashboard",
    Component: AdminPage,
    children: [
      {
        path: "/adminDashboard/productList",
        Component: ProductList,
      },
      {
        path:'/adminDashboard/productAdd'
      }
    ],
  },
]);
