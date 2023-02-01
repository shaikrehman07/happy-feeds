import { useEffect, useState } from "react";
import axios from "axios";

function UserFriends() {
  const [friendsList, setFriendsList] = useState([]);
  const [dataReceived, setDataReceived] = useState(false);
  useEffect(() => {
    const setAuthHeaders = {
      Authorization: JSON.parse(localStorage.getItem("IdToken")),
      AccessToken: JSON.parse(localStorage.getItem("AccessToken")),
    };
    axios({
      method: "get",
      url: `/api/${JSON.parse(localStorage.getItem("userEmail"))}/friends`,
      headers: setAuthHeaders,
    })
      .then((res) => {
        setFriendsList(res.data);
        setDataReceived(true);
      })
      .catch((err) => console.log(err.data));
  }, []);
  return (
    <div className="mt-5">
      {dataReceived === false ? null : friendsList.length === 0 ? (
        <div className="font-medium text-lg text-gray-700">
          No Friends to display
        </div>
      ) : (
        friendsList.map((friends) => {
          return (
            <div
              key={friends}
              className="bg-gray-100 w-80 p-4 rounded-md font-medium mt-2"
            >
              {friends}
            </div>
          );
        })
      )}
    </div>
  );
}

export default UserFriends;
