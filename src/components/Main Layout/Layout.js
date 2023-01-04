import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import nav_data from "./Layout_Data.js/NavLink_Items_data";
import side_menu_data from "./Layout_Data.js/SideMenu_Items_data";
import Home from "../SideMenu_Components/Home/Home";
import Create from "../SideMenu_Components/Create/Create";
import Item1 from "../NavBar Components/Item1";
import Item2 from "../NavBar Components/Item2";
import Item3 from "../NavBar Components/Item3";

const Layout = () => {
  console.log("outside");

  return (
    <div className="flex flex-col h-screen">
      {console.log("inside")}
      <nav className="bg-blue-500 text-white fixed w-full z-10 top-0 h-16">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="text-2xl font-bold">My App</div>
          <div className="flex space-x-4">
            <NavLink to={nav_data.links.item1} className={nav_data.style}>
              Item 1
            </NavLink>
            <NavLink to={nav_data.links.item2} className={nav_data.style}>
              Item 2
            </NavLink>
            <NavLink to={nav_data.links.item3} className={nav_data.style}>
              Item 3
            </NavLink>
          </div>
        </div>
      </nav>
      <div className="flex flex-row h-full">
        <aside className="bg-gray-300 fixed w-72 z-20 left-0 top-16 bottom-0">
          <div className="py-4 px-2">
            <NavLink
              to={side_menu_data.home.link}
              className={side_menu_data.style}
            >
              Home
            </NavLink>
            <NavLink
              to={side_menu_data.create.link}
              className={side_menu_data.style}
            >
              Create
            </NavLink>
            <NavLink
              to={side_menu_data.logout.link}
              className={side_menu_data.style}
              onClick={() => localStorage.clear()}
            >
              Logout
            </NavLink>
          </div>
        </aside>
        <main className="flex-1 overflow-y-scroll bg-white p-4 mt-16 ml-72">
          <Routes>
            <Route exact path="/item1" element={<Item1 />} />
            <Route exact path="/item2" element={<Item2 />} />
            <Route exact path="/item3" element={<Item3 />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/create" element={<Create />} />
            {/* <Route exact path="/logout" element={<Menu3 />} /> */}
            {/* </Route> */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Layout;
