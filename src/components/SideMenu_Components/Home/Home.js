import photo1 from "./img1.png";
import ProfileStatus from "./ProfileStatus";

function Home() {
  console.log("home outside");
  return (
    <div className="flex flex-row border-2 border-black">
      {console.log("home inside")}
      <div className="w-4/5">
        <div className="px-14">
          <img
            src={photo1}
            alt=""
            className="h-[30rem] w-full rounded-sm"
          ></img>
          <p>react</p>
        </div>
        <div className="px-14">
          <img
            src={photo1}
            alt=""
            className="h-[30rem] w-full rounded-sm"
          ></img>
          <p>react</p>
        </div>
      </div>
      <div>
        <ProfileStatus />
      </div>
    </div>
  );
}

export default Home;
