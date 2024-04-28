import React, { useState, useEffect } from "react";
import logo from "./assets/Logo.svg";

const Nav: React.FC = () => {
  return (
    <div className="w-full fixed flex items-end gap-1 px-4">
      <img src={logo} alt="" className="w-14" />
      <p className="website-title text-3xl font-bold text-green-500">GameQuest</p>
    </div>
  );
};

export default Nav;
