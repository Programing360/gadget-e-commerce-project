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
import ProductAdd from "../mainLayout/DashBoard/ProductAdd";
import Dashboard from "../mainLayout/DashBoard/Dashboard";
import CheckoutPage from "../page/PaymentMethod/CheckOutPage";
import Inbox from "../mainLayout/DashBoard/Inbox";
import Notification from "../mainLayout/DashBoard/Notification";
import AllProductList from "../mainLayout/DashBoard/AllProductList";
import OrderCancel from "../mainLayout/DashBoard/OrderCancel";
import UserDashBoard from "../mainLayout/userDashBoard/UserDashBoard";

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
    path: "/onlinePayment",
    Component: CheckoutPage,
  },
  {
    path: "/adminDashboard",
    Component: AdminPage,
    children: [
      {
        path: "/adminDashboard",
        Component: Dashboard,
      },
      {
        path: "/adminDashboard/productList",
        Component: ProductList,
      },
      {
        path: "/adminDashboard/productAdd",
        Component: ProductAdd,
      },
      {
        path: "/adminDashboard/inbox",
        Component: Inbox,
      },
      {
        path: "/adminDashboard/orderCencel",
        Component: OrderCancel,
      },
      {
        path: "/adminDashboard/allProductList",
        Component: AllProductList,
      },
    ],
  },
  {
    path: "/userDashBoard",
    Component: UserDashBoard,
  },
]);
