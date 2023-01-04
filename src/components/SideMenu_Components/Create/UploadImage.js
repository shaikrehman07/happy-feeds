import { useNavigate } from "react-router-dom";

function UploadImage({ uploadFile }) {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        Caption:
        <input type="text" />
      </div>
      <div>
        <img src={uploadFile} alt="" className="h-[30rem] w-3/5" />
      </div>
      <button onClick={() => navigate("/me/home")}>Done</button>
    </div>
  );
}

export default UploadImage;
