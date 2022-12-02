import { NavLink } from "react-router-dom";
import { useState } from "react";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import useAuth from "../../auth/useAuth";
import "../../styles/Header.css";

const Header = () => {
  const [open, cycleOpen] = useCycle(false, true);
  const { isLoggedIn, currentUser, removeUser } = useAuth();

  return (
    <>
      <header>
        <NavLink className="logo" to="/">
          <img src="/images/logo.svg" alt="" />
        </NavLink>
        <button onClick={cycleOpen}>Burger</button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ width: 0 }}
            transition={{ duration: 1 }}
            animate={{ width: "30%", position: "absolute", top: 0, right: 0 }}
            exit={{ width: 0, transition: { duration: 0.5 } }}
          >
            <motion.nav className="top-nav">
              {isLoggedIn && (
                <>
                  <NavLink to="/profile">
                    {currentUser && currentUser.username}
                  </NavLink>
                  <button onClick={removeUser}>Log-Out</button>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <NavLink to="/signin">Log in</NavLink>
                  <NavLink to="/signup">Sign Up</NavLink>
                </>
              )}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
