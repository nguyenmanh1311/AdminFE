import { useUser } from "../context/UserContext";
import React from "react";
import { Navigate, Route, Outlet, useNavigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useUser();
    let location = useLocation();

   

    return children;
};
