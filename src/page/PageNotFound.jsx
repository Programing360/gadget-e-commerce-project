import { Helmet } from "react-helmet";
import { useLocation } from "react-router";
import { Link } from "react-router";

const PageNotFound = () => {
  const location = useLocation();
  const from = location.state?.from || "/";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <Helmet>
        <title>Not Found | Zeromiroo</title>

        <meta
          name="description"
          content="Complete your purchase securely at Zeromiroo. Fast checkout, secure payment, and reliable delivery across Bangladesh."
        />

        {/* <link rel="canonical" href="https://my-coffee-9129e.web.app/checkout" /> */}
      </Helmet>

      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-4">Oops! Page not found</p>

      <Link to={from} className="mt-6">
        <button className="btn bg-[#e17100] text-white">Go Home</button>
      </Link>
    </div>
  );
};

export default PageNotFound;