const Modal = ({ handleClose }) => {
  return (
    <div>
      <div className="justify-center items-center fixed inset-0 z-50 w-full h-full flex">
        <div className=" p-4 relative bg-white w-max border-0 rounded-lg shadow-lg w-[550px] h-[550px]">
          <div className="file_upload flex flex-col w-max">
            <div className="input_field">
              <label>
                <input
                  className="text-sm cursor-pointer w-36 hidden"
                  type="file"
                />
                <div className="text bg-cyan-600 hover:bg-cyan-700 text-white rounded font-semibold cursor-pointer p-1 px-3">
                  upload photos
                </div>
              </label>
            </div>
            <button
              className="absolute bottom-4 right-4 p-1 w-24 text bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold cursor-pointer p-1 px-3"
              type="button"
              onClick={handleClose}
            >
              Done
            </button>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-60"></div>
    </div>
  );
};

export default Modal;
