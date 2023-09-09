import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../views/loader";
const API_URL = "http://localhost:5050/";

const ProtectedRoute = () => {
  const nav = useNavigate();
  const [loading, setloading] = useState(true);

  const isValid = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(API_URL + "auth/tokenValidation", { token });
      setloading(false);
      if (res.valid) {
        nav("/login");
      }
    } catch (error) {
      nav("/login");
      return error;
    }
  };
  useEffect(() => {
    isValid();
  }, []);

  return <>{loading ? <Loader /> : <Outlet />}</>;
};
export default ProtectedRoute;
