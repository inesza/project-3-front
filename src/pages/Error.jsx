import React from "react";
import { Link } from "react-router-dom";
import "./../styles/Error.css";

const Error = () => {
  return (
    <section className="error-page">
      <h1>Error 404</h1>
      <h2>Seems like you got lost...</h2>
      <Link to="/" className="btn btn-orange-shadow-mint">
        Return to home
      </Link>
    </section>
  );
};

export default Error;
