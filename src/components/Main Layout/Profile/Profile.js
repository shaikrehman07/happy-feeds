import { useState, useRef, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import Compressor from "compressorjs";
import axios from "axios";
import { ImageFromInitial } from "./ImageFromInitial";
import { IoMdClose } from "react-icons/io";

function Profile() {
  const [image, setImage] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dp, setDp] = useState("");

  const [displayDialog, setDisplayDialog] = useState(false);

  const [scale, setScale] = useState(2);
  const editorRef = useRef(null);
  const [newImage, setNewImage] = useState();

  function handleScaleChange(event) {
    setScale(Number(event.target.value));
  }

  function onSave() {
    const canvasScaled = editorRef.current.getImageScaledToCanvas();

    saveImageonServer(canvasScaled.toDataURL());
    setImage(canvasScaled.toDataURL());

    setDisplayDialog(false);
    setNewImage(null);
  }

  function getBase64StringFromDataURL(dataURL) {
    return dataURL.replace("data:", "").replace(/^.+,/, "");
  }

  function saveImageonServer(file) {
    const value = getBase64StringFromDataURL(file);

    const setAuthHeaders = {
      Authorization: JSON.parse(localStorage.getItem("IdToken")),
      AccessToken: JSON.parse(localStorage.getItem("AccessToken")),
      "Content-Type": "text/plain",
    };

    axios({
      method: "post",
      url: `/api/uploadDP?email=${JSON.parse(
        localStorage.getItem("userEmail")
      )}`,
      data: value,
      headers: setAuthHeaders,
    })
      .then(() => {
        //console.log(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }

  function handleChange(event) {
    new Compressor(event.target.files[0], {
      quality: 0.5,
      success(result) {
        //console.log(result);
        setNewImage(result);
      },
      error(err) {
        console.log(err.message);
      },
    });
  }

  useEffect(() => {
    const setAuthHeaders = {
      Authorization: JSON.parse(localStorage.getItem("IdToken")),
      AccessToken: JSON.parse(localStorage.getItem("AccessToken")),
    };
    axios({
      method: "get",
      url: `/api/userProfile?email=${JSON.parse(
        localStorage.getItem("userEmail")
      )}`,
      headers: setAuthHeaders,
    })
      .then((res) => {
        //console.log(res);
        const new_name =
          res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1);
        setName(new_name);
        setEmail(res.data.email);
        setDp(res.data.dp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div>
        <img
          style={{ textAlign: "center" }}
          src={`${
            image
              ? image
              : dp.length !== 0
              ? `data:image/png;base64,${dp}`
              : name.length !== 0
              ? ImageFromInitial(150, name.charAt(0), "#555555")
              : ""
          }`}
          className="w-[120px] h-[120px] object-cover rounded-[50%] border-2 border-gray-200 hover:cursor-pointer text-2xl "
          onClick={() => setDisplayDialog(true)}
          alt=""
        />
      </div>
      <div className="py-3 mt-2 text-xl font-medium text-gray-700">{name}</div>
      {/* <div className="flex flex-col justify-start w-[280px]"> */}
      <div className="text-sm font-medium text-gray-700">{email}</div>
      {/* </div> */}

      {displayDialog && (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-3 border-b border-solid border-gray-700 rounded-t">
                  <div className="flex items-center space-x-4">
                    <p className="font-medium">Profile Pic</p>
                    <label>
                      <input
                        id="input"
                        className="text-sm cursor-pointer w-36 hidden"
                        type="file"
                        onChange={handleChange}
                        accept="image/*"
                      />
                      <div className="w-max text bg-cyan-600 hover:bg-cyan-700 text-white rounded font-semibold cursor-pointer p-1 px-3">
                        update
                      </div>
                    </label>
                  </div>
                  <button
                    className="hover:bg-gray-300 hover:rounded-full"
                    onClick={() => {
                      setDisplayDialog(false);
                      setNewImage(null);
                    }}
                  >
                    <IoMdClose size="28px" />
                  </button>
                </div>
                {/*body*/}
                <div
                  className={`${
                    newImage ? "relative flex-auto p-2" : "realtive flex-auto"
                  }`}
                >
                  <div className="flex flex-col align-items-center">
                    {!newImage ? (
                      <div className="flex flex-wrap justify-center content-center h-[350px] w-[350px]">
                        <div>
                          <img src={`data:image/png;base64,${dp}`} alt="" />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <AvatarEditor
                          ref={editorRef}
                          image={URL.createObjectURL(newImage)}
                          width={350}
                          height={350}
                          border={20}
                          color={[255, 255, 255, 0.6]} // RGBA
                          scale={scale}
                          rotate={0}
                          borderRadius={200}
                        />
                        <div className="flex justify-between">
                          <div>
                            <input
                              id="steps-range"
                              type="range"
                              min="1"
                              max="3"
                              value={scale}
                              onChange={handleScaleChange}
                              step="0.5"
                              className="w-full mt-8 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                            />
                          </div>
                          <div>
                            <button
                              className="mt-5 p-1 w-20 text-medium font-semibold rounded bg-cyan-600 text-white hover:bg-cyan-700"
                              onClick={onSave}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      )}
    </div>
  );
}

export default Profile;
