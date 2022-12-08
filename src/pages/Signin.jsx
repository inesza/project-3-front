import FormSignIn from "../components/Forms/FormSignIn";
import "./../styles/Profile.css";
const Signin = () => {
  return (
    <div className="cont">
      <section className="signin">
        <FormSignIn />
      </section>
      <div className="user-demo migraine-card">
        <div>
          <h2>Demo profile</h2>
          <p>
            <span>Email: </span>
            user@mail.com
          </p>
          <p>
            <span>Password: </span>
            1234
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
