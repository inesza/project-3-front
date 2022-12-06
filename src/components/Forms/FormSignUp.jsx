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

const FormSignUp = ({ edit }) => {
  const navigate = useNavigate();
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
    if (edit) {
      service
        .patch("/api/auth/edit", formData)
        .then((res) => {
          navigate("/profile");
          navigate(0);
        })
        .catch((e) => console.log(e));
    } else {
      apiHandler
        .signup(formData)
        .then(() => {
          navigate("/signin");
        })
        .catch((error) => {
          setError(error.response);
        });
    }
  };
  const handleDelete = () => {
    service
      .delete(`/api/auth/delete`)
      .then(
        (document.querySelector(".modal-header h3").textContent =
          "Profile deleted")
      )
      .then(
        setTimeout(() => {
          navigate("/");
        }, 1000)
      )
      .catch((e) => {
        console.error(e.message);
      });
  };
  return (
    <section>
      <section className="dark-bg-orange-shadow">
        {edit && <h2>Edit Profile</h2>}
        {!edit && <h2>Sign up</h2>}
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
      </section>
      {edit && (
        <>
          <button onClick={toggleModal}>Delete my profile</button>
          <ModalConfirmDelete
            isShowing={isShowing}
            hide={toggleModal}
            handleDelete={handleDelete}
            modalTitle={"Delete my profile"}
          />
        </>
      )}
    </section>
  );
};

export default FormSignUp;
