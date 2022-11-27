function Profile() {
  return (
    <div className="px-2 py-5 rounded-md">
      <div className="flex flex-col items-center">
        <div className="h-24 w-24 rounded-full bg-slate-200 ring-2 ring-slate-400"></div>
        <div className="p-3">FName LName</div>
      </div>
      <div className="px-5">
        <div className="">I am great</div>
        <div className="">
          Friends: <span>50</span>
        </div>
        <div className="">email@gmail.com</div>
      </div>
    </div>
  );
}

export default Profile;
