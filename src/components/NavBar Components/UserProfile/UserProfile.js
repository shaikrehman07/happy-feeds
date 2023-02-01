import { NavLink, Routes, Route } from "react-router-dom";
import UserFriends from "./UserFriends";
import UserPhotos from "./UserPhotos";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function UserProfile(props) {
  const location = useLocation();
  const [photosActive, setPhotosActive] = useState(false);
  const [friendsActive, setFriendsActive] = useState(false);

  useEffect(() => {
    if (location.pathname === "/me/userProfile/photos") {
      setPhotosActive(true);
    } else {
      setFriendsActive(true);
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex space-x-5 items-center justify-center">
        <NavLink
          to="/me/userProfile/photos"
          onClick={() => {
            setPhotosActive(true);
            setFriendsActive(false);
          }}
          className={`${
            photosActive
              ? "font-bold bg-cyan-600 text-white px-3 py-2 rounded-md"
              : "font-bold px-3 py-2"
          }`}
        >
          Photos
        </NavLink>
        <NavLink
          to="/me/userProfile/friends"
          onClick={() => {
            setPhotosActive(false);
            setFriendsActive(true);
          }}
          className={`${
            friendsActive
              ? "font-bold bg-cyan-600 text-white px-3 py-2 rounded-md"
              : "font-bold px-3 py-2"
          }`}
        >
          Friends
        </NavLink>
      </div>
      <div>
        <Routes>
          <Route default exact path="/photos" element={<UserPhotos />} />
          <Route exact path="/friends" element={<UserFriends />} />
        </Routes>
      </div>
    </div>
  );
}

export default UserProfile;
