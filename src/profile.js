function Profile(props) {
  return (
    <div className="border-2 border-black mx-10 pt-5">
      <div className="flex flex-col items-center">
        <div className="h-24 w-24 rounded-full bg-slate-200 ring-2 ring-slate-400"></div>
        <div className="pt-3">{props.name}</div>
      </div>

      <div className="mt-5">
        <div className="">I am great</div>
        <div className="">
          Friends: <span>50</span>
        </div>
        <div className="">{props.email}</div>
      </div>
    </div>
  );
}

export default Profile;
