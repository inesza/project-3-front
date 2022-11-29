import React from "react";
import useAuth from "../../auth/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
	const { isLoggedIn, isLoading } = useAuth();
	if (isLoading) return <p>Loading...</p>;
	if (!isLoggedIn) return <Navigate to="/signin" />;
	else return <Outlet />;
};

export default PrivateRoute;
