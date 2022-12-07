import React from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";
import useCheckbox from "../../../hooks/useCheckbox";
import Notes from "../../Notes/Notes";

const FormNewMigraineStep4 = ({
  page,
  setPage,
  formData,
  setFormData,
  handleFormData,
  x,
  setX,
}) => {
  useEffect(() => {}, []);

  return (
    <motion.div
      initial={{ x: x }}
      transition={{ delay: 0, duration: 1 }}
      animate={{ x: 0 }}
      className="form-sign-up-div"
    >
      <Notes
        name="notes"
        value={formData.notes}
        handleFormData={handleFormData}
      />
      <div className="form-nav" style={{ textAlign: "left" }}>
        <button
          onClick={() => {
            setPage(page - 1);
            setX(-1000);
          }}
          className="btn-grey-shadow-light-grey "
        >
          Previous
        </button>
      </div>
    </motion.div>
  );
};

export default FormNewMigraineStep4;
