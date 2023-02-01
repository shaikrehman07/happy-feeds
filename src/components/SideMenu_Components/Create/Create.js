import { useState, useRef } from "react";
import axios from "axios";
import { MdOutlineCancel } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Compressor from "compressorjs";
import { IoIosImages } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Create() {
  const [file, setFile] = useState();
  const caption = useRef();
  const [cancelPhoto, setCancelPhoto] = useState(false);
  const [done, setDone] = useState(false);
  const [load, setLoad] = useState(false);

  function handleChange(event) {
    new Compressor(event.target.files[0], {
      quality: 0.5,

      // The compression process is asynchronous,
      // which means you have to access the `result` in the `success` hook function.
      success(result) {
        console.log(result.name);
        setFile(result);
      },
      error(err) {
        console.log(err.message);
      },
    });
  }

  function handleChangeOther(event) {
    setFile(event.target.files[0]);
    setCancelPhoto(!cancelPhoto);
  }

  function handleUpload() {
    const formData = new FormData();
    formData.append("File", file);
    formData.append("caption", caption.current.value);

    setLoad(true);

    const setAuthHeaders = {
      Authorization: JSON.parse(localStorage.getItem("IdToken")),
      AccessToken: JSON.parse(localStorage.getItem("AccessToken")),
      "Content-Type": "multipart/form-data",
    };

    axios({
      method: "post",
      url: `/api/upload?email=${JSON.parse(localStorage.getItem("userEmail"))}`,
      data: formData,
      headers: setAuthHeaders,
    })
      .then((res) => {
        console.log(res.data);

        setLoad(false);
        setDone(true);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }

  return (
    <div className="">
      {done ? (
        <div className="flex flex-row justify-center h-[36rem]">
          <div className="flex flex-col justify-center items-center h-[32rem] w-[200px]">
            <div className="text-3xl font-bold text-cyan-600 p-3">Done!!!!</div>
            <div>
              <button
                className="text-medium font-medium text-xl text-sky-600 p-3 hover:text-sky-700"
                onClick={() => {
                  setDone(false);
                  setFile(null);
                }}
              >
                upload more
              </button>
            </div>
            <div>
              <NavLink
                className="text-medium font-medium text-xl text-gray-600 p-3 hover:text-gray-700"
                to="/me/home"
              >
                go to home
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-row justify-center space-x-3 h-[36rem]">
          {file && (
            <button
              className="absolute bottom-10 left-[405px]"
              onClick={() => {
                setCancelPhoto(!cancelPhoto);
                setFile(null);
              }}
            >
              <MdOutlineCancel
                size="20px"
                style={{ color: "red", opacity: 0.8 }}
              />
            </button>
          )}
          <div className="flex flex-wrap justify-center content-center h-[32rem] w-[500px]">
            {!file && !cancelPhoto && (
              <div className="h-[350px] w-[350px] border-dashed border-2 border-gray-400 rounded-md flex flex-col space-y-4 justify-center items-center">
                <div>
                  <IoIosImages size="100px" color="gray" />
                </div>
                <label>
                  <input
                    id="input"
                    className="text-sm cursor-pointer w-36 hidden"
                    type="file"
                    onChange={handleChange}
                    accept="image/*"
                  />
                  <div className="w-max cursor-pointer px-4 py-1 text-sm text-cyan-600 font-semibold rounded-full border border-cyan-700 hover:text-white hover:bg-cyan-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2">
                    upload
                  </div>
                </label>
                <div className="text-gray-800 font-medium tx-medium">
                  only jpg/png files.....
                </div>
              </div>
            )}
            {file && !cancelPhoto && (
              <div className="flex flex-row justify-center h-[500px] w-[500px] border-2 border-gray-100 rounded">
                <img
                  src={URL.createObjectURL(file)}
                  alt=""
                  className="object-scale-down"
                />
              </div>
            )}
            {!file && cancelPhoto && (
              <label>
                <input
                  id="input"
                  className="text-sm cursor-pointer w-36 hidden"
                  type="file"
                  onChange={handleChangeOther}
                  accept="image/*"
                />
                <div className="w-max cursor-pointer active:bg-cyan-700 px-4 py-1 text-sm text-cyan-600 font-semibold rounded-full border border-cyan-700 hover:text-white hover:bg-cyan-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2">
                  other photo
                </div>
              </label>
            )}
          </div>

          {(file || cancelPhoto) && (
            <div>
              <div className="text-md font-medium text-gray-700">Caption:</div>
              <textarea
                className="border-2 border-gray-100 text-gray-700 text-md font-normal rounded outline-none w-[250px] h-24  mt-1 placeholder-gray-500 focus:placeholder-opacity-0"
                placeholder="Write caption...."
                name="caption"
                ref={caption}
              />
            </div>
          )}

          {file && (
            <div className="absolute bottom-0 right-44 flex">
              <button
                className="w-20 bg-cyan-600 hover:bg-cyan-700 p-2 rounded text-white tet-lg font-semibold"
                onClick={handleUpload}
                disabled={load}
              >
                Done
              </button>
              {load && (
                <AiOutlineLoading3Quarters
                  className="ml-2 h-4 w-4 animate-spin text-black self-center"
                  size="8px"
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Create;
