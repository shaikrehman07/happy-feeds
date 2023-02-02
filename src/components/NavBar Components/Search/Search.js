import { useEffect, useState } from "react";
import UserList from "./UserList";
import axios from "axios";

function Search() {
  const [name, setName] = useState("");
  const [searchUserList, setSearchUserList] = useState();
  const [userDataFound, setUserDataFound] = useState();

  function handleInputChange(e) {
    const fieldValue = e.target.value;
    setName(fieldValue);
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
      <div className="flex justify-center">
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
      </div>
      <div className="ml-5">
        {name && (
          <UserList
            key=""
            userList={searchUserList}
            userDataFlag={userDataFound}
          />
        )}
      </div>
    </div>
  );
}

export default Search;
