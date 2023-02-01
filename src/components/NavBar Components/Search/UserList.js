import { NavLink } from "react-router-dom";

function UserList({ userList, userDataFlag }) {
  return (
    <div className="overflow-y-auto first:mt-4">
      {userList &&
        userList.map((userData) => (
          <div key={userData.email}>
            <div className="bg-slate-50 flex w-[450px] justify-start py-4 px-5 bg-white rounded-xl space-y-2 mb-2">
              {/* //image */}
              <div className="flex space-x-5">
                {/* <div className="border border-black h-16 w-16 rounded-full" /> */}
                <div className="flex flex-row items-center justify-between w-[400px]">
                  <div className="space-y-0.5">
                    <p className="text-md text-black font-semibold">
                      {userData.fullName}
                    </p>
                    <p className="text-slate-500 font-small">
                      {userData.email}
                    </p>
                  </div>
                  <div>
                    <NavLink
                      to={`/me/user/${userData.email}`}
                      className="h-10 w-20 px-4 py-1 text-sm text-cyan-600 font-semibold rounded-full border border-cyan-700 hover:text-white hover:bg-cyan-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2"
                    >
                      Profile
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      {userDataFlag === false && userList.length === 0 ? "No User Found" : ""}
    </div>
  );
}

export default UserList;
