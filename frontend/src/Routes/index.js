import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./IsProtected";
import Dashboard from "../views/dashboard";
import SignUp from "../views/signup";
import LogIn from "../views/login";

const AppRouter = React.memo(() => {
  return (
    <Routes>
      <Route path="/signup" name="Home" element={<SignUp />} />
      <Route path="/login" name="Home" element={<LogIn />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" name="Home" element={<Dashboard />} />
      </Route>
      <Route path="*" name="Not Found 404" element={<>404 No Found</>} />
    </Routes>
  );
});

export default AppRouter;
