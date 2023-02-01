import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import nav_data from "./Layout_Data.js/NavLink_Items_data";
import side_menu_data from "./Layout_Data.js/SideMenu_Items_data";
import Home from "../SideMenu_Components/Home/Home";
import Create from "../SideMenu_Components/Create/Create";
import Search from "../NavBar Components/Search/Search";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import Profile from "./Profile/Profile";
import OtherProfile from "../SideMenu_Components/Other_Profile";
import Requests from "../NavBar Components/Requests/Requests";
import UserProfile from "../NavBar Components/UserProfile/UserProfile";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <nav className="flex flex-row justify-center text-cyan-700 fixed w-full z-10 top-0 h-15 border border-b-1 shadow-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="text-3xl font-bold font-serif">Feeds</div>
          <div className="flex justify-center space-x-4">
            <NavLink to={nav_data.links.search} className={nav_data.style}>
              <IoSearchOutline
                data-bs-toggle="tooltip"
                title="user search"
                size="28px"
              />
            </NavLink>
            <NavLink to={nav_data.links.requests} className={nav_data.style}>
              <IoMdNotificationsOutline
                data-bs-toggle="tooltip"
                title="friend requests"
                size="28px"
              />
            </NavLink>
            <NavLink to={nav_data.links.userProfile} className={nav_data.style}>
              <AiOutlineUser
                data-bs-toggle="tooltip"
                title="user profile"
                size="28px"
              />
            </NavLink>
          </div>
        </div>
      </nav>
      <div className="flex flex-row h-full">
        <aside className="border-r-2 border-slate-100 fixed w-[325px] z-20 left-0 top-16 bottom-0">
          <div className="py-4 px-2 divide-y">
            <div>
              <Profile />
            </div>
            <div className="flex flex-col items-center mt-5">
              <div className="mt-5 space-y-3">
                <NavLink
                  to={side_menu_data.home.link}
                  className={side_menu_data.style}
                >
                  <div className="flex space-x-10">
                    <div className="mt-0.5">{side_menu_data.home.icon}</div>
                    <div>Home</div>
                  </div>
                </NavLink>
                <NavLink
                  to={side_menu_data.create.link}
                  className={side_menu_data.style}
                >
                  <div className="flex space-x-10">
                    <div className="mt-0.5">{side_menu_data.create.icon}</div>
                    <div>Create</div>
                  </div>
                </NavLink>
                <NavLink
                  to={side_menu_data.logout.link}
                  className={side_menu_data.style}
                  onClick={() => localStorage.clear()}
                >
                  <div className="flex space-x-10">
                    <div className="mt-0.5">{side_menu_data.logout.icon}</div>
                    <div>Logout</div>
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-y-scroll bg-white p-4 mt-16 ml-[325px]">
          <Routes>
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/requests" element={<Requests />} />
            <Route path="/userProfile/*" element={<UserProfile />} />
            <Route path="/requests/*" element={<Requests />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/create" element={<Create />} />
            <Route exact path="/user/:user" element={<OtherProfile />} />
            {/* </Route> */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Layout;
