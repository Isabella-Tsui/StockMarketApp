import React from "react";
import LoginForm from "../components/LoginForm";

//This file contains the component that renders the login form

export default function LoginPage({ setIsAuthenticated }) {
  return <LoginForm setIsAuthenticated={setIsAuthenticated} />;
}
