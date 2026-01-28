
import { Navigate } from "react-router";

import { use } from "react";
import { UseContext } from "../Context/AuthContext";


const PrivateRoute = ({ children }) => {
    const { user, loading } = use(UseContext);

    if (loading) return <span className="loading loading-spinner loading-xl grid h-56 grid-cols-3 place-items-center gap-4 mx-auto "></span>;

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;