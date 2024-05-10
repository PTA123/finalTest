import React from "react";
import { FaBars, FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <div className="w-full h-[1rem] p-10 rounded-t-2xl flex items-center justify-between border-b-2">
      <FaBars className="text-3xl text-gray-500 cursor-pointer" />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/CGV_logo.svg/1200px-CGV_logo.svg.png"
        width={100}
        className="cursor-pointer"
      />
      <FaSearch className="text-3xl text-gray-500 cursor-pointer" />
    </div>
  );
};

export default Header;
