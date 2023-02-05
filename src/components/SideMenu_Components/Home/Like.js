import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";

function Like({ otherUserEmail, imgIndex }) {
  const [likeData, setLikeData] = useState(null);
  const [like, setLike] = useState(false);

  function handleLikePress() {
    setLike(true);

    const setAuthHeaders = {
      Authorization: JSON.parse(localStorage.getItem("IdToken")),
      AccessToken: JSON.parse(localStorage.getItem("AccessToken")),
    };
    axios({
      method: "post",
      url: `/api/likes/${otherUserEmail}/${JSON.parse(
        localStorage.getItem("userEmail")
      )}?imgIndex=${imgIndex}`,
      headers: setAuthHeaders,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    console.log("useEffect like");
    const setAuthHeaders = {
      Authorization: JSON.parse(localStorage.getItem("IdToken")),
      AccessToken: JSON.parse(localStorage.getItem("AccessToken")),
    };
    axios({
      method: "get",
      url: `/api/likes/${otherUserEmail}/${JSON.parse(
        localStorage.getItem("userEmail")
      )}?imgIndex=${imgIndex}`,
      headers: setAuthHeaders,
    })
      .then((res) => {
        console.log(res);
        setLikeData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [otherUserEmail, imgIndex]);

  return (
    <div>
      {likeData ? (
        likeData.likedByYou ? (
          likeData.likes === 1 ? (
            <div className="flex space-x-1 text-gray-700">
              <div className="text-red-600">
                <AiFillHeart size="25px" />
              </div>
              <div>
                liked by <span className="font-semibold">you</span>
              </div>
            </div>
          ) : (
            <div className="flex space-x-1 text-gray-700">
              <div className="text-red-600">
                <AiFillHeart size="25px" />
              </div>
              <div>
                liked by <span className="font-semibold">you</span> and
              </div>
              <button className="font-semibold">
                &nbsp;{likeData.likes} others
              </button>
            </div>
          )
        ) : likeData.likes === 0 ? (
          like ? (
            <div className="flex space-x-1 text-gray-700">
              <div className="text-red-600">
                <AiFillHeart size="25px" />
              </div>
              <div>
                liked by <span className="font-semibold">you</span>
              </div>
            </div>
          ) : (
            <button onClick={handleLikePress} className="text-gray-700">
              <AiOutlineHeart size="25px" />
            </button>
          )
        ) : like ? (
          <div className="flex space-x-1 text-gray-700">
            <div className="text-red-600">
              <AiFillHeart size="25px" />
            </div>
            <div>
              liked by <span className="font-semibold">you</span> and
            </div>
            <button className="font-semibold">
              &nbsp;{likeData.likes} others
            </button>
          </div>
        ) : (
          <div className="flex space-x-1 text-gray-700">
            <button onClick={handleLikePress}>
              <AiOutlineHeart size="25px" />
            </button>
            <div>liked by</div>
            <button className="font-semibold">
              &nbsp;{likeData.likes} others
            </button>
          </div>
        )
      ) : null}
    </div>
  );
}

export default Like;
