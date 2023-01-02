import Status from "./status";
import Feeds from "./feeds";

function Home() {
  return (
    <div className="flex flex-row">
      <div className=" bg-yellow-100">
        <div className="px-6">
          <Feeds />
          <Feeds />
          <Feeds />
        </div>
      </div>
      <div className="bg-blue-200">
        <Status />
      </div>
    </div>
  );
}

export default Home;
