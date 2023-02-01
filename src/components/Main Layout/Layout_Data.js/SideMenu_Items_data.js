import { AiOutlineHome } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";

const side_menu_data = {
  style:
    "block font-bold text-center rounded-full w-[200px] py-2 px-4 hover:bg-slate-200 focus:outline-none focus:shadow-outline-gray active:bg-slate-400",
  home: { link: "/me/home", icon: <AiOutlineHome size="20px" /> },
  create: { link: "/me/create", icon: <IoIosAddCircleOutline size="20px" /> },
  logout: { link: "/", icon: <IoLogOutOutline size="20px" /> },
};

export default side_menu_data;
