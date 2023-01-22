
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
/* 
export default function ProtectedRoutes({ component: children}) {

    let location = useLocation();
    const token = cookies.get("TOKEN");

    // returns route if there is a valid token set in the cookie
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
  
    return children;
    
  }

  const ProtectedRoutes = ({ children }) => {
    let location = useLocation();
    const token = cookies.get("TOKEN");

    // returns route if there is a valid token set in the cookie
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
  
    return children;
  };*/