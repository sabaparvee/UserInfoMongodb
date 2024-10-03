import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center text-center "> 
      <div className="logo font-bold text-2xl text-white ">
        <span className="text-green-700">&lt;</span>
        Pass
        <span className="text-green-700">OP/&gt;</span>
      </div>
      <div className="flex  justify-center items-center">
        Created with <img className="w-8 p-1 mx-2 " src="icons/heart-solid.svg" alt="" /> by Saba
      </div>
    </div>
  );
};

export default Footer;
