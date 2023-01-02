import photo1 from "./assets/img1.png";

function Feeds() {
  return (
    <div className="border-2 border-black">
      <div className="px-14">
        <img src={photo1} alt="" className="h-[30rem] w-full rounded-sm"></img>
        <p>react</p>
      </div>
    </div>
  );
}

export default Feeds;
