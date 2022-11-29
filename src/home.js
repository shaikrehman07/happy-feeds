import { useLocation } from "react-router-dom";
import Profile from "./profile";
import SectionList from "./sections";
import Status from "./status";
import Feeds from "./feeds";

function Home() {
  const location = useLocation();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <nav className="flex flex-none items-center py-2 justify-between flex-wrap bg-gray-400">
        <h1 className="p-3">Logo</h1>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 bg-indigo-100">
          <div className="">
            <Profile />
          </div>
          <div className="">
            <SectionList />
          </div>
        </div>

        <div className="flex bg-yellow-100 w-3/5">
          <div className="px-6 flex-1 overflow-y-auto">
            <Feeds />
            <Feeds />
          </div>
        </div>
        <div className="flex-auto bg-blue-200">
          <Status />
        </div>
      </div>
    </div>
  );
}

export default Home;
