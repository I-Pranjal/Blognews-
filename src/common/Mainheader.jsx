import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navbar } from "../assets/data";
import { Menu, X } from "lucide-react"; // Using Lucide icons for the menu toggle

const Mainheader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-black text-white w-full p-3 sm:p-0">
      <div className="max-w-screen-xl mx-auto px-4 flex">
        {/* Hamburger Menu Icon */}
        <button
          className="text-white focus:outline-none md:hidden"
          onClick={toggleMenu}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Navbar Links */}
        <ul
          className={`md:flex md:items-center md:justify-start absolute md:static z-10 bg-black w-full left-0 md:w-auto transition-all duration-300 ease-in ${
            isOpen ? "top-16 opacity-100" : "top-[-490px] opacity-0"
          } md:opacity-100`}
        >
          {navbar.map((nav, key) => (
            <li key={key} className="m-2 p-1 font-thin hover:text-yellow-300">
              <Link to={nav.path} onClick={() => setIsOpen(false)}>
                {nav.nav}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Mainheader;
