import "./App.css";
import React from "react";

/* import pages */
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

/* Routing Settings */
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/singup" element={<SignUp />}></Route>
      </Routes>
    </>
  );
}

export default App;
