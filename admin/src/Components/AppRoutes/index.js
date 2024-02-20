import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../redux-services/slices/AuthSlice";
import Signin from "../../signin";
import Register from "../../register";
import Dashboard from "../../Dashboard";
import Edit from "../update/index"
function AppRoutes() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      dispatch(setAuth());
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/signin" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signin />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
      <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />} />
     
        <Route path="/dashboard/update" element={isAuthenticated ? <Edit /> : <Navigate to="/signin" />} />
     
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/signin"} />} />
    </Routes>
  );
}

export default AppRoutes;
