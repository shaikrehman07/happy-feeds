import { useLocation } from "react-router-dom";
import Profile from "./profile";
import SectionList from "./sections";
import Status from "./status";
import Feeds from "./feeds";

function Home() {
  const location = useLocation();

  return (
    <div className="flex flex-row gap-2">
      {/* <h3>Hello, {location.state.name}</h3> */}
      <div className="w-72">
        <div className="">
          <Profile />
        </div>
        <div className="">
          <SectionList />
        </div>
      </div>
      <div className="h-screen mx-10 grow overflow-y-auto bg-indigo-500">
        <Feeds />
      </div>
      <div className="w-96">
        <Status />
      </div>
    </div>
  );
}

export default Home;
