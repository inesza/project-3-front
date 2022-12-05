import React from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";
import useCheckbox from "../../../hooks/useCheckbox";

const FormNewMigraineStep3 = ({
  page,
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
      <h2>Treatments Category</h2>
      <div
        className="form-nav"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <button
          onClick={() => {
            setPage(page - 1);
            setX(-1000);
          }}
          className="btn-grey-shadow-light-grey "
        >
          Previous
        </button>
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

export default FormNewMigraineStep3;
