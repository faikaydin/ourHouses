// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginRoute = () => {
  const { currentUser } = useAuth();

  // Add your own authentication on the below line.

  if (currentUser) {
    return <Navigate to={{ pathname: "/" }} />;
  }

  return <Outlet /> ;
};

export default LoginRoute;
