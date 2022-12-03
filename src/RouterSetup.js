import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login";
import SignUp from "./signup";
import Home from "./home";
import ProtectedRoutes from "./ProtectedRoutes";

function RouterSetup() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default RouterSetup;
