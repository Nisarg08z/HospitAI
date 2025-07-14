import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLogedin, setisLogedin] = useState(false);
  const [userDetail, setuserDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkLogin = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setisLogedin(false);
      setuserDetail(null);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/v1/admin/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setuserDetail(res.data.data || null);
      setisLogedin(true);
    } catch (err) {
      console.error("Invalid or expired token");
      setuserDetail(null);
      setisLogedin(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLogedin,
        setisLogedin,
        userDetail,
        setuserDetail,
        loading,
        checkLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
