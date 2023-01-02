import React from "react";
import Profile from "./profile";
import SectionList from "./sections";
import MainComponent from "./main_component";

function MainPage() {
  const name = JSON.parse(localStorage.getItem("name"));
  console.log(name);
  const email = JSON.parse(localStorage.getItem("email"));

  return (
    <React.Fragment>
      <div className="h-screen flex flex-col overflow-hidden">
        <nav className="flex flex-none items-center py-2 justify-between flex-wrap bg-gray-400">
          <h1 className="p-3">Logo</h1>
        </nav>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-96 bg-indigo-100">
            <div className="">
              <Profile name={name} email={email} />
            </div>
            <div className="">
              <SectionList />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <MainComponent />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default MainPage;
