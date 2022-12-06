import { motion } from "framer-motion";
import { useState } from "react";

const FormSignUpStep2 = ({
  page,
  currentUser,
  setPage,
  formData,
  setFormData,
  x,
  setX,
}) => {
  const [displayGender, setDisplayGender] = useState(false);
  const [displayBirthdate, setDisplayBirthdate] = useState(false);

  const userBirthDate = new Date(currentUser.birth).toLocaleDateString("fr-FR");

  const handleDisplay = (event) => {
    if (event.target.className.includes("gender")) {
      setDisplayGender((currentValue) => {
        return !currentValue;
      });
    } else if (event.target.className.includes("birth")) {
      setDisplayBirthdate((currentValue) => {
        return !currentValue;
      });
    }
  };
  return (
    <motion.div
      initial={{ x: x }}
      transition={{ delay: 0, duration: 1 }}
      animate={{ x: 0 }}
      className="form-sign-up-div"
    >
      <div>
        <div>
          <p>
            <span>Gender: </span>
            {currentUser.gender}
          </p>
        </div>
        <div>
          <span
            className="btn btn-select gender"
            onClick={(event) => handleDisplay(event)}
          >
            Edit
          </span>
        </div>
        {displayGender && (
          <select
            name="gender"
            id="gender"
            value={formData.value}
            defaultValue={"DEFAULT"}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          >
            <option value="DEFAULT" disabled>
              -- Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="nb-gf">Non binary / Gender fluid</option>
            <option value="other">Other</option>
          </select>
        )}
      </div>
      <div>
        <div>
          <p>
            <span>Birth Date: </span>
            {userBirthDate}
          </p>
        </div>
        <div>
          <span
            className="btn btn-select birth"
            onClick={(event) => handleDisplay(event)}
          >
            Edit
          </span>
        </div>
        {displayBirthdate && (
          <input
            type="date"
            placeholder="Birth"
            value={formData.birth}
            onChange={(e) =>
              setFormData({ ...formData, birth: e.target.value })
            }
          />
        )}
      </div>

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

export default FormSignUpStep2;
