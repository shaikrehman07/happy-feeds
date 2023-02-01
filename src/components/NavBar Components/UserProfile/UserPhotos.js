import { useState, useEffect } from "react";
import axios from "axios";

function UserPhotos() {
  const [imgArray, setImgArray] = useState([]);

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
      url: `/api/photos?email=${JSON.parse(localStorage.getItem("userEmail"))}`,
      headers: setAuthHeaders,
    })
      .then((res) => {
        setImgArray(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="mt-5">
      {imgArray.length !== 0 ? (
        <div className="grid grid-cols-2 gap-8">
          {imgArray.map((imgSrc, index) => (
            <div key={index}>
              <img
                src={URL.createObjectURL(b64toBlob(imgSrc))}
                alt=""
                className="object-center object-cover rounded h-[600px] w-[500px] hover:opacity-70"
              ></img>
            </div>
          ))}
        </div>
      ) : (
        <div className="font-medium text-lg text-gray-700">
          No Memories to display
        </div>
      )}
    </div>
  );
}

export default UserPhotos;
