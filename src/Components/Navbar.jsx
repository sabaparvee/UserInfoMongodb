import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Navbar = () => {
  return (
    <nav className="bg-slate-800  text-white px-11">
      <div className="myconatiner flex  items-center justify-between px-4 py-5 h-14">
        <div className="logo font-bold text-2xl text-white ">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">OP/&gt;</span>
        </div>
        {/* <ul>
          <li className="flex gap-4">
            <a className="hover:font-bold" href="#">
              Home
            </a>
            <a className="hover:font-bold" href="#">
              About
            </a>
            <a className="hover:font-bold" href="#">
              Contact
            </a>
          </li>
        </ul> */}
        <button  className="text-white my-5 bg-green-700 rounded-full flex  justify-center gap-2 ring-white ring-1">
       <img className="invert p-1 w-8 " src="icons/github-brands-solid.svg" alt="github"/>
       <span className="font-bold p-1">GitHub</span>
 
        
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
