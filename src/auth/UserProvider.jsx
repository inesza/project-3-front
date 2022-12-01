import { useState, useEffect } from "react";
import UserContext from "./UserContext";
import service from "../api/apiHandler";

const UserProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    currentUser: null,
    isLoading: true,
    isLoggedIn: false,
  });

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = () => {
    service
      .isLoggedIn()
      .then((user) => {
        setAuth({ currentUser: user, isLoading: false, isLoggedIn: true });
      })
      .catch((e) => {
        setAuth({ currentUser: null, isLoading: false, isLoggedIn: false });
        console.error(e.message);
      });
  };

  const removeUser = async () => {
    removeToken();
    authenticateUser();
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authValues = {
    currentUser: auth.currentUser,
    isLoading: auth.isLoading,
    isLoggedIn: auth.isLoggedIn,
    removeUser,
    storeToken,
    authenticateUser,
  };

  return (
    <UserContext.Provider value={authValues}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
