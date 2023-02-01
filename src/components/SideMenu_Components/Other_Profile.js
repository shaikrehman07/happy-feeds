import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ImageFromInitial } from "../Main Layout/Profile/ImageFromInitial";

function OtherProfile() {
  const { user } = useParams();
  const navigate = useNavigate();

  const otherUserDetailsURL = `/api/accept/${user}/${JSON.parse(
    localStorage.getItem("userEmail")
  )}`;
  const [otherUserDetails, setOtherUserDetails] = useState({
    name: "",
    email: "",
    friendStatus: "",
    friendsCount: "",
    userPhotos: [],
  });
  const [friendRequestSent, setFriendRequestSent] = useState(false);
  const [friendAcceptSent, setFriendAcceptSent] = useState(false);

  const b64toBlob = (b64Data, sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays);
    return blob;
  };

  function handleFriendRequest() {
    setFriendRequestSent(true);
    const setAuthHeaders = {
      Authorization: JSON.parse(localStorage.getItem("IdToken")),
      AccessToken: JSON.parse(localStorage.getItem("AccessToken")),
    };
    axios({
      method: "post",
      url: `/api/friend/${user}/${JSON.parse(
        localStorage.getItem("userEmail")
      )}`,
      headers: setAuthHeaders,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAcceptRequest() {
    setFriendAcceptSent(true);
    const setAuthHeaders = {
      Authorization: JSON.parse(localStorage.getItem("IdToken")),
      AccessToken: JSON.parse(localStorage.getItem("AccessToken")),
    };
    axios({
      method: "post",
      url: otherUserDetailsURL,
      headers: setAuthHeaders,
    })
      .then((res) => {
        console.log(res.data);
        axios({
          method: "get",
          url: `/api/${JSON.parse(
            localStorage.getItem("userEmail")
          )}/user/${user}`,
          headers: setAuthHeaders,
        })
          .then((res) => {
            console.log(res.data);
            setOtherUserDetails(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    console.log("use Effect");
    if (user === JSON.parse(localStorage.getItem("userEmail"))) {
      navigate("/me/userProfile/photos");
    }
    if (friendAcceptSent === false && friendRequestSent === false) {
      const setAuthHeaders = {
        Authorization: JSON.parse(localStorage.getItem("IdToken")),
        AccessToken: JSON.parse(localStorage.getItem("AccessToken")),
      };
      axios({
        method: "get",
        url: `/api/${JSON.parse(
          localStorage.getItem("userEmail")
        )}/user/${user}`,
        headers: setAuthHeaders,
      })
        .then((res) => {
          console.log(res);
          setOtherUserDetails(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [friendAcceptSent, friendRequestSent, user, navigate]);

  return (
    <div className="">
      <div className="flex flex-col items-stretch">
        <div className="self-center mb-10 flex flex-row space-x-10 border border-slate-300 rounded-md p-10 items-center w-[800px] justify-between">
          <div className="flex flex-row space-x-8 items-center">
            <div className="">
              <img
                className="ml-8 border-2 border-gray-200 w-[120px] h-[120px] object-cover rounded-[50%]"
                src={
                  otherUserDetails.userDP
                    ? `data:image/png;base64,${otherUserDetails.userDP}`
                    : ImageFromInitial(
                        150,
                        otherUserDetails.name.charAt(0),
                        "#555555"
                      )
                }
                alt=""
              />
            </div>
            <div className="flex flex-col w-96">
              <div className="text-lg font-medium text-gray-700">
                {otherUserDetails.name}
              </div>
              <div className="text-medium font-medium text-gray-700">
                {otherUserDetails.email}
              </div>
              {/* <div className="break-words">Bio:</div> */}
              <div className="text-lg font-medium text-gray-700 mt-3">
                Friends: {otherUserDetails.friendsCount}
              </div>
            </div>
          </div>
          <div className="">
            {otherUserDetails.friendStatus === "Request Sent" ||
            friendRequestSent === true ? (
              <div className="w-30 px-2 py-1 text-sm text-cyan-600 font-semibold rounded-full border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2">
                Request Sent
              </div>
            ) : otherUserDetails.friendStatus === "Send Request" ? (
              <button
                onClick={handleFriendRequest}
                className="w-36 px-2 py-1 text-sm text-cyan-600 font-semibold rounded-full border border-cyan-700 hover:text-white hover:bg-cyan-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2"
              >
                Send Request
              </button>
            ) : otherUserDetails.friendStatus === "Friends" ||
              friendAcceptSent === true ? (
              <div className="w-30 px-4 py-1 text-sm text-cyan-600 font-semibold rounded-full border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2">
                Friends
              </div>
            ) : otherUserDetails.friendStatus === "Accept Request" ? (
              <button
                onClick={handleAcceptRequest}
                className="w-36 px-2 py-1 text-sm text-cyan-600 font-semibold rounded-full border border-cyan-700 hover:text-white hover:bg-cyan-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2"
              >
                Accept Request
              </button>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mb-4 text-lg font-medium text-gray-700">Photos</div>
          {otherUserDetails.friendStatus === "Friends" ? (
            otherUserDetails.userPhotos.length !== 0 ? (
              <div className="grid grid-cols-4 gap-2">
                {otherUserDetails.userPhotos.map((imgSrc, index) => (
                  <div key={index}>
                    <img
                      src={URL.createObjectURL(b64toBlob(imgSrc))}
                      alt=""
                      className="object-center object-cover rounded h-[300px] w-[300px] hover:opacity-70"
                    ></img>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-medium font-medium text-gray-700">No Posts</p>
            )
          ) : (
            <p className="text-medium font-medium text-gray-700">
              Be friends to see Posts
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OtherProfile;
