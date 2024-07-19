import { Outlet, Navigate } from "react-router-dom";
import { userContext } from "../context/userContext";
import { useContext } from "react";

export const ProtectedRoutes = () => {
  const { user } = useContext(userContext);
  // console.log('User in ProtectedRoutes:', user);

  return user ? <Outlet /> : <Navigate to={'/users/login'} />
}