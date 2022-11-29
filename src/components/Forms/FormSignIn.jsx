import React, { useState } from "react"
import useForm from "../../hooks/useForm"
import apiHandler from "../../api/apiHandler"
import useAuth from "../../auth/useAuth"
import { useNavigate } from "react-router-dom"

const FormSignIn = () => {
	const [{ email, password }, handleChange] = useForm({
		email: "",
		password: "",
	})
	const [error, setError] = useState(null)
	const navigate = useNavigate()
	const { storeToken, authenticateUser } = useAuth()

	const handleSubmit = (e) => {
		e.preventDefault()
		apiHandler
			.signin({ email, password })
			.then((res) => {
				console.log(res)
				storeToken(res.authToken)
				authenticateUser()
				navigate("/")
			})
			.catch((e) => {
				setError(e.response.data)
			})
	}

	return (
		<>
			{error && <h3 className="error">{error.message}</h3>}
			<form onSubmit={handleSubmit}>
				<h2>Signin</h2>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					onChange={handleChange}
					value={email}
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					onChange={handleChange}
					value={password}
				/>
				<button>Submit</button>
			</form>
		</>
	)
}

export default FormSignIn

// const token = localStorage.getItem('authToken')

// axios.get("http://localhost:8080/api/private", {
// 	headers: {
// 		Authorization: `Bearer ${token}` ,
// 	},
// })
