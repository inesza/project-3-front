import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "./../api/apiHandler";
import FormSignUpStep1Edit from "./Forms/FormSignUp/FormSignUpStep1Edit";
import FormSignUpStep2Edit from "./Forms/FormSignUp/FormSignUpStep2Edit";
import useAuth from "./../auth/useAuth";
import useModal from "./../hooks/useModal";
import ModalConfirmDelete from "./ModalConfirmDelete";

const FormSignUp = () => {
  const navigate = useNavigate();
  const { isLoggedIn, currentUser, removeUser } = useAuth();
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
    <FormSignUpStep1Edit
      currentUser={currentUser}
      page={page}
      setPage={setPage}
      formData={formData}
      setFormData={setFormData}
      x={x}
      setX={setX}
    />,
    <FormSignUpStep2Edit
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
    service
      .patch("/api/auth/edit", formData)
      .then((res) => {
        navigate("/profile");
        navigate(0);
      })
      .catch((e) => console.log(e));
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
          removeUser();
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
        <h2>Edit Profile</h2>

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

      <>
        <button onClick={toggleModal}>Delete my profile</button>
        <ModalConfirmDelete
          isShowing={isShowing}
          hide={toggleModal}
          handleDelete={handleDelete}
          modalTitle={"Delete my profile"}
        />
      </>
    </section>
  );
};

export default FormSignUp;
