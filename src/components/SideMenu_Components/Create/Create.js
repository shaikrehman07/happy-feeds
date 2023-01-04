import { useState } from "react";
import UploadImage from "./UploadImage";

function Create() {
  const [file, setFile] = useState();
  function handleChange(event) {
    setFile(URL.createObjectURL(event.target.files[0]));
  }
  return (
    // <div className="file_upload w-max">
    //   <div className="input_field">
    <div>
      {!file && (
        <label>
          <input
            id="input"
            className="text-sm cursor-pointer w-36 hidden"
            type="file"
            onChange={handleChange}
            accept="image/*"
          />
          <div className="w-max text bg-cyan-600 hover:bg-cyan-700 text-white rounded font-semibold cursor-pointer p-1 px-3">
            upload
          </div>
        </label>
      )}
      {file && <UploadImage uploadFile={file} />}
    </div>
    //   </div>
    // </div>
  );
}

export default Create;
