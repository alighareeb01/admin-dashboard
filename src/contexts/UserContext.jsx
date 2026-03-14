import { createContext, useEffect, useState } from "react";

export const User = createContext();

export default function UserProvider({ children }) {
  const [userToken, setUserToken] = useState(
    localStorage.getItem("dbToken") || null,
  );

  useEffect(() => {
    userToken
      ? localStorage.setItem("dbToken", userToken)
      : localStorage.removeItem("dbToken");
  }, [userToken]);

  return (
    <User.Provider value={{ userToken, setUserToken }}>
      {children}
    </User.Provider>
  );
}
