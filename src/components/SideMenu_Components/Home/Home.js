import ProfileStatus from "./ProfileStatus";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";

function Home() {
  const navigate = useNavigate();

  const [userHome, setUserHome] = useState({
    feeds: "",
    posts: "",
    userFeedsList: [],
  });

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

  useEffect(() => {
    const setAuthHeaders = {
      Authorization: JSON.parse(localStorage.getItem("IdToken")),
      AccessToken: JSON.parse(localStorage.getItem("AccessToken")),
    };
    axios({
      method: "get",
      url: `/api/feeds?email=${JSON.parse(localStorage.getItem("userEmail"))}`,
      headers: setAuthHeaders,
    })
      .then((res) => {
        //console.log(res);
        setUserHome(res.data);
      })
      .catch((err) => {
        if (err.response.data.status === 401) {
          localStorage.clear();
          const text =
            "Please Sign in to continue as session is expired.\nChanges you made will be reflected after Login";
          if (window.confirm(text) === true) {
            navigate("/");
          }
        }
      });
  }, [navigate]);

  return (
    <div className="flex flex-row ml-10">
      {userHome.userFeedsList.length === 0 ? (
        <div className="w-4/5">
          <div className="text-3xl text-gray-700 font-medium p-4">
            No Feeds!!!
          </div>
          <div className="text-xl text-gray-700 font-medium p-4">
            Connect to see feeds...
          </div>
        </div>
      ) : (
        <div className="">
          <div className="w-4/5">
            {userHome.userFeedsList.map((feed, index) => (
              <div className="ml-10 px-20 pb-5" key={index}>
                <div className="h-[630px] w-[500px] border border-gray-300 rounded-md">
                  <div className="px-2 py-4 text-lg font-medium">
                    {feed.email}
                  </div>
                  <img
                    src={URL.createObjectURL(b64toBlob(feed.image))}
                    alt=""
                    className="object-scale-down h-[500px] w-[500px] border border-gray-300 border-l-0 border-r-0"
                  ></img>
                  <div className="px-2 py-1 pt-2">
                    <button>
                      <AiOutlineHeart size="25px" />
                    </button>
                  </div>
                  <div className="px-2 pb-1 flex">
                    <div className="font-medium">{feed.name}&nbsp;&nbsp;</div>
                    <div className="font-sm">
                      {feed.caption === "no value" ? "" : feed.caption}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <ProfileStatus posts={userHome.posts} feeds={userHome.feeds} />
      </div>
    </div>
  );
}

export default Home;
