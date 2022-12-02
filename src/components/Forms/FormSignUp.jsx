// import useForm from "../../hooks/useForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import FormSignUpStep1 from "./FormSignUp/FormSignUpStep1";
import FormSignUpStep2 from "./FormSignUp/FormSignUpStep2";

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
      <section className="dark-bg-orange-shadow">
        <h2>Sign up</h2>
        <div
          className="progress-bar-container"
          style={{
            justifyContent: page === 0 ? "flex-start" : "flex-end",
          }}
        >
          <div className="progress-bar"></div>
        </div>
        <form onSubmit={handleSubmit}>
          {stepsList[page]}
          <br />
          {page === 1 && <button>Submit</button>}
        </form>
      </section>
    </section>
  );
};

export default FormSignUp;
