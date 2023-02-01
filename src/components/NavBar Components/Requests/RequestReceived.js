import { useEffect, useState } from "react";
import axios from "axios";

function RequestReceived() {
  const [receivedList, setReceivedList] = useState([]);
  const [dataReceived, setDataReceived] = useState(false);

  function handleAccept(userName) {
    const setAuthHeaders = {
      Authorization: JSON.parse(localStorage.getItem("IdToken")),
      AccessToken: JSON.parse(localStorage.getItem("AccessToken")),
    };
    axios({
      method: "post",
      url: `/api/accept/${userName}/${JSON.parse(
        localStorage.getItem("userEmail")
      )}`,
      headers: setAuthHeaders,
    })
      .then((res) => {
        console.log(res.data);
        setReceivedList((updatedList) => {
          return updatedList.filter((email) => email !== userName);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const setAuthHeaders = {
      Authorization: JSON.parse(localStorage.getItem("IdToken")),
      AccessToken: JSON.parse(localStorage.getItem("AccessToken")),
    };
    axios({
      method: "get",
      url: `/api/${JSON.parse(
        localStorage.getItem("userEmail")
      )}/receivedRequest`,
      headers: setAuthHeaders,
    })
      .then((res) => {
        setReceivedList(res.data);
        setDataReceived(true);
      })
      .catch((err) => console.log(err.data));
  }, []);

  return (
    <div>
      {dataReceived === false ? null : receivedList.length === 0 ? (
        <div className="font-medium text-lg">No Requests Received</div>
      ) : (
        receivedList.map((received) => {
          return (
            <div
              key={received}
              className="flex justify-between items-center bg-slate-50 w-96 p-4 rounded-md font-medium mt-2"
            >
              <div className="">{received}</div>
              <div>
                <button
                  onClick={() => {
                    handleAccept(received);
                  }}
                  className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white p-2 rounded-md"
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default RequestReceived;
