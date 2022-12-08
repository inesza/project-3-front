import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../auth/useAuth";
import "../../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faBars,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [open, cycleOpen] = useState(false);
  const { isLoggedIn, currentUser, removeUser } = useAuth();
  const itemVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };
  const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
  };

  const closeMenu = (event) => {
    if (event.target !== document.getElementById("burger-menu-container")) {
      cycleOpen(false);
    }
  };
  useEffect(() => {
    if (open === true) {
      document.addEventListener("click", closeMenu);
    }
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [open]);

  return (
    <>
      <header>
        <NavLink className="logo" to="/">
          <img src="/images/logo.svg" alt="" />
        </NavLink>
        <span id="burger-menu-container" onClick={() => cycleOpen(!open)}>
          <FontAwesomeIcon
            icon={faBars}
            style={{ fontSize: "2em" }}
            id="burger-menu"
          />
        </span>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 250, position: "fixed", right: 0 }}
            exit={{ width: 0, transition: { delay: 0.5 } }}
            className="side-menu"
          >
            <motion.nav
              className="top-nav"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
            >
              {isLoggedIn && (
                <>
                  <motion.span variants={itemVariants}>
                    <NavLink to="/profile">My profile</NavLink>
                  </motion.span>
                  <motion.span variants={itemVariants}>
                    <NavLink to="/migraines">Migraines journal</NavLink>
                  </motion.span>
                  <motion.span variants={itemVariants}>
                    <NavLink to="/migraines/statistics">My stats</NavLink>
                  </motion.span>

                  <motion.span onClick={removeUser} variants={itemVariants}>
                    Log out{" "}
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      style={{ marginLeft: "10px" }}
                    />
                  </motion.span>
                  <Link
                    to="/migraines/create"
                    className="nav-new-migraine-button"
                  >
                    New record
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ marginLeft: "1em" }}
                    />
                  </Link>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <motion.span variants={itemVariants}>
                    <NavLink to="/signin">Log in</NavLink>
                  </motion.span>
                  <motion.span variants={itemVariants}>
                    <NavLink to="/signup">Sign Up</NavLink>
                  </motion.span>
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
