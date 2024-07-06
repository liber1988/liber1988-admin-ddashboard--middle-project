import React, { createContext, useContext } from "react";
import useFetchUserData from "../firebase/newUserDataCreation";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { userDetails, loading, error } = useFetchUserData();

  return (
    <UserContext.Provider value={{ userDetails, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
