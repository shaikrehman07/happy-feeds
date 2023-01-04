import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Main Layout/Layout";
import Login from "./components/Login_Signup_Pages/Login";
import SignUp from "./components/Login_Signup_Pages/SignUp";
import PrivateRoute from "./PrivateRoute";

function App() {
  const authToken = JSON.parse(localStorage.getItem("IdToken"));
  const isAuth = authToken ? true : false;
  console.log("isAuth " + isAuth);

  // const auth = JSON.parse(localStorage.getItem("Auth"));
  // console.log("Auth "+auth);
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/me/*" element={<Layout />}></Route>
          </Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
