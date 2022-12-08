import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import apiHandler from "../../api/apiHandler";
import useAuth from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const FormSignIn = () => {
  const [{ email, password }, handleChange] = useForm({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    apiHandler
      .signin({ email, password })
      .then((res) => {
        storeToken(res.authToken);
        authenticateUser();
        navigate("/profile");
      })
      .catch((e) => {
        setError(e.response.data);
      });
  };

  return (
    <section className="dark-bg-orange-shadow">
      {error && <h3 className="error">{error.message}</h3>}
      <form onSubmit={handleSubmit}>
        <h2>Log in</h2>

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email *"
          onChange={handleChange}
          value={email}
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password *"
          onChange={handleChange}
          value={password}
        />
        <button>Submit</button>
      </form>
      <div style={{ textAlign: "center" }}>
        <Link to={"/signup"} style={{ textDecoration: "underline" }}>
          Not yet registered? Sign up!
        </Link>
      </div>
    </section>
  );
};

export default FormSignIn;
