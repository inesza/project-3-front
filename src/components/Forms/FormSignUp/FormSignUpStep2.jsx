import { motion } from "framer-motion";

const FormSignUpStep2 = ({ page, setPage, formData, setFormData, x, setX }) => {
  return (
    <motion.div
      initial={{ x: x }}
      transition={{ delay: 0, duration: 1 }}
      animate={{ x: 0 }}
      className="form-sign-up-div"
    >
      <select
        name="gender"
        id="gender"
        value={formData.value}
        defaultValue={"DEFAULT"}
        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
      >
        <option value="DEFAULT" disabled>
          -- Gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="nb-gf">Non binary / Gender fluid</option>
        <option value="other">Other</option>
      </select>

      <input
        type="date"
        placeholder="Birth"
        value={formData.birth}
        onChange={(e) => setFormData({ ...formData, birth: e.target.value })}
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

export default FormSignUpStep2;
