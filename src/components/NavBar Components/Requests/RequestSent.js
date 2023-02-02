import { useEffect, useState } from "react";
import axios from "axios";

function RequestSent() {
  const [sentList, setSentList] = useState([]);
  const [dataReceived, setDataReceived] = useState(false);

  useEffect(() => {
    //console.log("sent use Effect");
    const setAuthHeaders = {
      Authorization: JSON.parse(localStorage.getItem("IdToken")),
      AccessToken: JSON.parse(localStorage.getItem("AccessToken")),
    };
    axios({
      method: "get",
      url: `/api/${JSON.parse(localStorage.getItem("userEmail"))}/sentRequest`,
      headers: setAuthHeaders,
    })
      .then((res) => {
        //console.log(res.data);
        setSentList(res.data);
        setDataReceived(true);
      })
      .catch((err) => console.log(err.data));
  }, []);

  return (
    <div>
      {dataReceived === false ? null : sentList.length === 0 ? (
        <div className="font-medium text-lg">No Requests Sent</div>
      ) : (
        sentList.map((sent) => {
          return (
            <div
              key={sent}
              className="bg-gray-100 w-80 p-4 rounded-md font-medium mt-2"
            >
              {sent}
            </div>
          );
        })
      )}
    </div>
  );
}

export default RequestSent;
