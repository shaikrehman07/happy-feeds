import { IoIosAddCircleOutline, IoIosAddCircle } from "react-icons/io";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import {
  IoSettingsOutline,
  IoSettingsSharp,
  IoLogOut,
  IoLogOutOutline,
} from "react-icons/io5";
import { useContext, useState } from "react";
import { LoginContext } from "./LoginStatus";
import { Navigate, NavLink } from "react-router-dom";
import Modal from "./Dialog";

function SectionList() {
  const [isHoveringHome, setIsHoveringHome] = useState(false);
  const [isHoveringMemories, setIsHoveringMemories] = useState(false);
  const [isHoveringSetting, setIsHoveringSetting] = useState(false);
  const [isHoveringLogout, setIsHoveringLogout] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { setLoggedIn } = useContext(LoginContext);

  return (
    <div className="border-2 border-rose-900 mx-10 mt-8">
      {showModal ? (
        <Modal
          handleClose={() => {
            setShowModal(false);
          }}
        />
      ) : null}
      <div
        className="flex hover:font-semibold py-2"
        onMouseOver={() => {
          setIsHoveringHome(true);
        }}
        onMouseOut={() => {
          setIsHoveringHome(false);
        }}
      >
        <div className="mt-0.5 mr-5">
          {isHoveringHome ? (
            <AiFillHome size="20px" />
          ) : (
            <AiOutlineHome size="20px" />
          )}
        </div>
        <NavLink to="/me/home">Home</NavLink>
      </div>
      <div
        className="flex hover:font-semibold py-2"
        onMouseOver={() => {
          setIsHoveringMemories(true);
        }}
        onMouseOut={() => {
          setIsHoveringMemories(false);
        }}
      >
        <div className="mt-0.5 mr-5">
          {isHoveringMemories ? (
            <IoIosAddCircle size="20px" />
          ) : (
            <IoIosAddCircleOutline size="20px" />
          )}
        </div>
        <button
          className=""
          onClick={() => {
            setShowModal(true);
          }}
        >
          Create
        </button>
      </div>
      <div
        className="flex hover:font-semibold py-2"
        onMouseOver={() => {
          setIsHoveringSetting(true);
        }}
        onMouseOut={() => {
          setIsHoveringSetting(false);
        }}
      >
        <div className="mt-0.5 mr-5">
          {isHoveringSetting ? (
            <IoSettingsSharp size="20px" />
          ) : (
            <IoSettingsOutline size="20px" />
          )}
        </div>
        <NavLink to="/me/settings">Profile Settings</NavLink>
      </div>
      <div
        className="flex hover:font-semibold py-2"
        onMouseOver={() => {
          setIsHoveringLogout(true);
        }}
        onMouseOut={() => {
          setIsHoveringLogout(false);
        }}
      >
        <div className="mt-0.5 mr-5">
          {isHoveringLogout ? (
            <IoLogOut size="20px" />
          ) : (
            <IoLogOutOutline size="20px" />
          )}
        </div>
        <button
          className=""
          onClick={() => {
            setLoggedIn(false);
            <Navigate to="/login" />;
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default SectionList;
