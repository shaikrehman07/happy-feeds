import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login";
import SignUp from "./signup";
import ProtectedRoutes from "./ProtectedRoutes";
import MainPage from "./MainPage";
import Setting from "./Setting";
import Home from "./home";

function RouterSetup() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/me" element={<MainPage />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="settings" element={<Setting />} />
          </Route>
        </Route>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default RouterSetup;
