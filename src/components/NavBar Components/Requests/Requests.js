import { NavLink, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RequestReceived from "./RequestReceived";
import RequestSent from "./RequestSent";

function Requests(props) {
  const location = useLocation();
  const [requestsSent, setRequestsSent] = useState(false);
  const [requestsReceived, setRequestsReceived] = useState(false);

  useEffect(() => {
    if (location.pathname === "/me/requests/sent") {
      setRequestsSent(true);
    } else {
      setRequestsReceived(true);
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex space-x-5 items-center justify-center">
        <NavLink
          to="/me/requests/received"
          onClick={() => {
            setRequestsSent(false);
            setRequestsReceived(true);
          }}
          className={`${
            requestsReceived
              ? "font-bold bg-cyan-600 text-white px-3 py-2 rounded-md"
              : "font-bold px-3 py-2"
          }`}
        >
          Received
        </NavLink>
        <NavLink
          to="/me/requests/sent"
          onClick={() => {
            setRequestsSent(true);
            setRequestsReceived(false);
          }}
          className={`${
            requestsSent
              ? "font-bold bg-cyan-600 text-white px-3 py-2 rounded-md"
              : "font-bold px-3 py-2"
          }`}
        >
          Sent
        </NavLink>
      </div>
      <div>
        <Routes>
          <Route default exact path="/received" element={<RequestReceived />} />
          <Route exact path="/sent" element={<RequestSent />} />
        </Routes>
      </div>
    </div>
  );
}

export default Requests;
