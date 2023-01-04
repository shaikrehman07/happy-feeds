import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  // const auth = JSON.parse(localStorage.getItem("Auth"));
  // return auth ? true : false;

  const authToken = JSON.parse(localStorage.getItem("IdToken"));
  const isAuth = authToken ? true : false;
  return isAuth;
};

const PrivateRoute = (props) => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
