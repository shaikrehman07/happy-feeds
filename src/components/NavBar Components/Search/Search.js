import { useEffect, useState } from "react";
import UserList from "./UserList";
import axios from "axios";
import AllOtherUsers from "./AllOtherUsers";

function Search() {
  const [name, setName] = useState("");
  const [searchUserList, setSearchUserList] = useState();
  const [userDataFound, setUserDataFound] = useState();
  const [allOtherUsers, setAllOtherUsers] = useState(false);
  const [otherUsersToShow, setOtherUsersToShow] = useState(null);

  function handleInputChange(e) {
    setAllOtherUsers(false);
    const fieldValue = e.target.value;
    setName(fieldValue);
  }

  function seeOtherUsers() {
    setName("");
    setAllOtherUsers(true);

    const setAuthHeaders = {
      Authorization: JSON.parse(localStorage.getItem("IdToken")),
      AccessToken: JSON.parse(localStorage.getItem("AccessToken")),
    };
    axios({
      method: "get",
      url: `/api/${JSON.parse(
        localStorage.getItem("userEmail")
      )}/allOtherUsers`,
      headers: setAuthHeaders,
    })
      .then((res) => {
        setOtherUsersToShow(res.data);
      })
      .catch((err) => console.log(err.data));
  }

  useEffect(() => {
    if (name.length >= 1) {
      const setAuthHeaders = {
        Authorization: JSON.parse(localStorage.getItem("IdToken")),
        AccessToken: JSON.parse(localStorage.getItem("AccessToken")),
      };
      axios({
        method: "get",
        url: `/api/users/${name}`,
        headers: setAuthHeaders,
      })
        .then((res) => {
          if (res.data.length === 0) {
            setUserDataFound(false);
          } else {
            setUserDataFound(true);
          }
          setSearchUserList(res.data);
        })
        .catch((err) => console.log(err.data));
    }
  }, [name]);

  return (
    <div>
      <div className="flex justify-center items-center space-x-3">
        <input
          type="search"
          value={name}
          onChange={handleInputChange}
          className="
                      block
                      w-[400px]
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white 
                      border border-solid 
                      border-gray-400
                      rounded-2xl
                      m-0
                      focus:text-gray-700 focus:ring-2 focus:ring-gray-500 focus:bg-white focus:outline-none
                    "
          placeholder="search by email"
        />
        <div className="font-sm text-gray-600 font-sans">or</div>
        <button className="font-medium text-gray-700" onClick={seeOtherUsers}>
          See Users
        </button>
      </div>
      <div className="ml-5">
        {name.length > 0 && (
          <UserList
            key=""
            userList={searchUserList}
            userDataFlag={userDataFound}
          />
        )}
        {allOtherUsers && otherUsersToShow && (
          <AllOtherUsers allOtherusersToShow={otherUsersToShow} />
        )}
      </div>
    </div>
  );
}

export default Search;
