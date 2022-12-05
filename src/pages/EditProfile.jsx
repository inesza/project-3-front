import React from "react";
import FormSignUp from "../components/Forms/FormSignUp";

const EditProfile = () => {
  return (
    <section className="signup">
      <FormSignUp edit={true} />
    </section>
  );
};

export default EditProfile;
