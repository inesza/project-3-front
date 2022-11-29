import React from "react"
import useAuth from "../../auth/useAuth"
import { Navigate, Outlet } from "react-router-dom"

const LoggedOut = () => {
	const { isLoggedIn, isLoading } = useAuth()
	if (isLoading) return <p>Loading...</p>
	if (isLoggedIn) return <Navigate to="/" />
	else return <Outlet />
}

export default LoggedOut
