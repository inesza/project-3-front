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
  const [displayUsername, setDisplayUsername] = useState(false);
  const [displayEmail, setDisplayEmail] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);

  const handleDisplay = (event) => {
    if (event.target.className.includes("username")) {
      setDisplayUsername((currentValue) => {
        return !currentValue;
      });
    } else if (event.target.className.includes("email")) {
      setDisplayEmail((currentValue) => {
        return !currentValue;
      });
    } else if (event.target.className.includes("password")) {
      setDisplayPassword((currentValue) => {
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
            <span>Username: </span>
            {currentUser.username}
          </p>
        </div>
        <div>
          <span
            className="btn btn-select username"
            onClick={(event) => handleDisplay(event)}
          >
            Edit
          </span>
        </div>

        {displayUsername && (
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        )}
      </div>

      <div>
        <div>
          <p>
            <span>Email: </span>
            {currentUser.email}
          </p>
        </div>
        <div>
          <span
            className="btn btn-select email"
            onClick={(event) => handleDisplay(event)}
          >
            Edit
          </span>
        </div>
        {displayEmail && (
          <input
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        )}
      </div>

      <div>
        <div>
          <p>
            <span>Password: </span>
          </p>
        </div>
        <div>
          <span
            className="btn btn-select password"
            onClick={(event) => handleDisplay(event)}
          >
            Edit
          </span>
        </div>

        {displayPassword && (
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        )}
      </div>

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
