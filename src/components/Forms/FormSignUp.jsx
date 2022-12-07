// import useForm from "../../hooks/useForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import service from "../../api/apiHandler";
import axios from "axios";
import FormSignUpStep1 from "./FormSignUp/FormSignUpStep1";
import FormSignUpStep2 from "./FormSignUp/FormSignUpStep2";
import ModalConfirmDelete from "../ModalConfirmDelete";
import useModal from "../../hooks/useModal";
import useAuth from "../../auth/useAuth";
import { Link } from "react-router-dom";
const FormSignUp = ({ edit }) => {
  const navigate = useNavigate();
  const { isLoggedIn, currentUser, removeUser } = useAuth();
  const [error, setError] = useState(null);
  const [x, setX] = useState(0);
  const [page, setPage] = useState(0);
  const { isShowing, toggleModal } = useModal();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    birth: "",
  });
  const stepsList = [
    <FormSignUpStep1
      currentUser={currentUser}
      page={page}
      setPage={setPage}
      formData={formData}
      setFormData={setFormData}
      x={x}
      setX={setX}
    />,
    <FormSignUpStep2
      currentUser={currentUser}
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
        navigate("/signin");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <section>
      <section className="dark-bg-orange-shadow">
        <h2>Sign up</h2>
        {error && error}
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{
              transform: page === 0 ? "translateX(0)" : "translateX(100%)",
              transition: "1s",
            }}
          ></div>
        </div>
        <form onSubmit={handleSubmit}>
          {stepsList[page]}
          <br />
          {page === 1 && <button>Submit</button>}
        </form>
        <div style={{ textAlign: "center" }}>
          <Link to={"/signin"} style={{ textDecoration: "underline" }}>
            Already have an account? Log in!
          </Link>
        </div>
      </section>
    </section>
  );
};

export default FormSignUp;
