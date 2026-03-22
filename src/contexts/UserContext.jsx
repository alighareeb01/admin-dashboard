import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const User = createContext();

export default function UserProvider({ children }) {
  const [userToken, setUserToken] = useState(
    localStorage.getItem("dbToken") || null,
  );
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null,
  );

  useEffect(() => {
    userToken
      ? localStorage.setItem("dbToken", userToken)
      : localStorage.removeItem("dbToken");
  }, [userToken]);
  useEffect(() => {
    userData
      ? localStorage.setItem("userData", JSON.stringify(userData))
      : localStorage.removeItem("userData");
  }, [userData]);
  const [categoriesAllData, setCategoriesAllData] = useState([]);
  const [categoriesPage, setCategoriesPage] = useState(1);
  const [categoriesPageData, setCategoriesPageData] = useState([]);
  return (
    <User.Provider
      value={{
        userToken,
        setUserToken,
        setUserData,
        userData,
        categoriesPage,
        setCategoriesPage,
        categoriesAllData,
        setCategoriesAllData,
        categoriesPageData,
        setCategoriesPageData,
      }}
    >
      {children}
    </User.Provider>
  );
}
