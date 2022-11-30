// import useForm from "../../hooks/useForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import FormSignUpStep1 from "./FormSignUp/FormSignUpStep1";
import FormSignUpStep2 from "./FormSignUp/FormSignUpStep2";
import { motion } from "framer-motion";

const FormSignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [x, setX] = useState(0);
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    birth: "",
  });
  const stepsList = [
    <FormSignUpStep1
      page={page}
      setPage={setPage}
      formData={formData}
      setFormData={setFormData}
      x={x}
      setX={setX}
    />,
    <FormSignUpStep2
      page={page}
      setPage={setPage}
      formData={formData}
      setFormData={setFormData}
      x={x}
      setX={setX}
    />,
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    apiHandler
      .signup(formData)
      .then(() => {
        alert("Created");
        // navigate("/signin");
      })
      .catch((error) => {
        setError(error.response);
      });
  };
  return (
    <section>
      <div
        className="progress-bar"
        style={{
          display: "flex",
          width: "100%",
          height: "20px",
          justifyContent: page === 0 ? "flex-start" : "flex-end",
        }}
      >
        <div style={{ width: "50%", background: "red" }}></div>
      </div>
      <div>Forms</div>
      <form onSubmit={handleSubmit}>
        {stepsList[page]}
        <br />
        {page === 1 && <button>Submit</button>}
      </form>
    </section>
  );
  // const [values, handleChange] = useForm({ name: "", email: "", password: "" })
  // const [error, setError] = useState(null)
  // const navigate = useNavigate()

  // const handleSubmit = (e) => {
  // 	e.preventDefault()
  // 	apiHandler
  // 		.signup(values)
  // 		.then(() => {
  // 			navigate("/signin")
  // 		})
  // 		.catch((error) => {
  // 			setError(error.response.data)
  // 		})
  // }
  // return (
  // 	<>
  // 		{error && <h3 className="error">{error.message}</h3>}
  // 		<form onSubmit={handleSubmit}>
  // 			<h2>Signup</h2>
  // 			<label htmlFor="name">Name</label>
  // 			<input
  // 				onChange={handleChange}
  // 				value={values.name}
  // 				type="text"
  // 				id="name"
  // 				name="name"
  // 			/>
  // 			<label htmlFor="email">Email</label>
  // 			<input
  // 				onChange={handleChange}
  // 				value={values.email}
  // 				type="email"
  // 				id="email"
  // 				name="email"
  // 			/>
  // 			<label htmlFor="password">Password</label>
  // 			<input
  // 				onChange={handleChange}
  // 				value={values.password}
  // 				type="password"
  // 				id="password"
  // 				name="password"
  // 			/>
  // 			<button>Submit</button>
  // 		</form>
  // 	</>
  // )
};

export default FormSignUp;
