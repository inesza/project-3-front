import { motion } from "framer-motion";
import { useState } from "react";

const FormSignUpStep1 = ({
  page,
  currentUser,
  setPage,
  formData,
  setFormData,
  x,
  setX,
}) => {
  return (
    <motion.div
      initial={{ x: x }}
      transition={{ delay: 0, duration: 1 }}
      animate={{ x: 0 }}
      className="form-sign-up-div"
    >
      <input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />

      <input
        type="text"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <div className="form-nav" style={{ textAlign: "right" }}>
        <button
          onClick={() => {
            setPage(page + 1);
            setX(1000);
          }}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default FormSignUpStep1;
