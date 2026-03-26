import { createBrowserRouter } from "react-router";
// import Root from "../Root/Root";
// import ProductDetails from "../page/ProductDetails/ProductDetails";
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
import AllProductList from "../mainLayout/DashBoard/AllProductList";
import OrderCancel from "../mainLayout/DashBoard/OrderCancel";
import UserDashBoardHome from "../mainLayout/userDashBoard/UserDashBoardHome";
import UserOrders from "../mainLayout/userDashBoard/UserOrders";
import PrivateRoute from "../PrivetRoutes/PrivateRoute";
import UserProfile from "../mainLayout/userDashBoard/UserProfile";
import UserSettion from "../mainLayout/userDashBoard/UserSettion";
import UserAllProducts from "../page/UserAllProducts";
import About from "../page/About";
import PageNotFound from "../page/PageNotFound";
import ContactUs from "../page/ContractUs/ContractUs";
import FAQSection from "../page/FAQSection";
import SearchInput from "../page/SearchInput/SearchInput";
import OrderInvoicePage from "../page/OrderInvoicePage/OrderInvoicePage";
import Home from "../component/Home/Home/Home";
import { lazy, Suspense } from "react";
import Loader from "../component/Loader/Loader";

const Root = lazy(() => import("../Root/Root"));
// const Home = lazy(() => import("../component/Home/Home/Home"));
const ProductDetails = lazy(() => import("../page/ProductDetails/ProductDetails"));
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <Root />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/productDetails/:id",
        Component: ProductDetails,
        loader: ({ params }) =>
          fetch(`https://zeromiroo-api.vercel.app/allProduct/${params.id}`),
      },
      {
        path: "/userAllProduct",
        Component: UserAllProducts,
      },
      {
        path: "/contract",
        Component: ContactUs,
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
      {
        path: "/about",
        Component: About,
      },
      {
        path: "*",
       errorElement: <PageNotFound />
      },
      {
        path: "/FAQSection",
        Component: FAQSection,
      },
      {
        path: "/searchInput",
        Component: SearchInput,
      },
      {
        path: "invoicePage",
        Component: OrderInvoicePage,
      },
    ],
  },
  {
    path: "/onlinePayment",
    Component: CheckoutPage,
  },
  {
    path: "invoicePage",
    Component: OrderInvoicePage,
  },
  {
    path: "/adminDashboard",
    element: (
      <PrivateRoute>
        <AdminPage></AdminPage>
      </PrivateRoute>
    ),

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
    element: (
      <PrivateRoute>
        <UserDashBoardHome></UserDashBoardHome>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/userDashBoard",
        Component: UserOrders,
      },
      {
        path: "/userDashBoard/profile",
        Component: UserProfile,
      },
      {
        path: "/userDashBoard/setting",
        Component: UserSettion,
      },
    ],
  },
]);
