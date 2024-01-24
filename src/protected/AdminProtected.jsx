import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminProtected = (props) => {
  const { adminAuth, Component, updateAuth } = props;
  let navigate = useNavigate();
  useEffect(() => {
    // let login = localStorage.getItem("login");

    if (!adminAuth) {
      navigate("/login-admin");
    }
  });

  return (
    <>
      <Component adminAuth={adminAuth} updateAuth={updateAuth} />
    </>
  );
};

export default AdminProtected;
