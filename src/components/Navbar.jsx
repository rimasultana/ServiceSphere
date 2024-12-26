import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import {
  FaHome,
  FaServicestack,
  FaUserAlt,
  FaSignOutAlt,
  FaBars,
  FaPlus,
  FaTasks,
  FaClipboardList,
  FaListUl,
} from "react-icons/fa";
import { MdOutlineDashboard, MdArrowDropDown } from "react-icons/md";
import logo from "../../public/logo.webp";
import useAuth from "../hooks/useAuth";
import DarkModeToggle from "react-dark-mode-toggle";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logOutUser, toggleTheme, isDarkMode } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleDropdownToggle = (event) => {
    event.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        toast.success("User logged out!");
      })
      .catch((error) => toast.error(error.message));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`p-4 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-blue-600 text-white"
      }`}
    >
      <nav className="flex items-center justify-between w-11/12 mx-auto">
        <div className="flex items-center">
          <img
            src={logo}
            alt="ServiceSphere Logo"
            className="w-10 h-10 rounded-md mr-2"
          />
          <span className="text-xl font-bold">ServiceSphere</span>
        </div>

        <div className="hidden md:flex space-x-4">
          <Link
            to="/"
            className={`flex items-center ${
              isActive("/") ? "text-yellow-300" : "hover:text-gray-300"
            }`}
          >
            <FaHome className="mr-1" /> Home
          </Link>
          <Link
            to="/services"
            className={`flex items-center ${
              isActive("/services") ? "text-yellow-300" : "hover:text-gray-300"
            }`}
          >
            <FaServicestack className="mr-1" /> Services
          </Link>

          {user ? (
            <>
              <div className="relative dropdown z-20">
                <button
                  onClick={handleDropdownToggle}
                  className={`flex items-center mt-2 ${
                    isDropdownOpen ? "text-yellow-300" : "hover:text-gray-300"
                  }`}
                >
                  <MdOutlineDashboard className="mr-1" /> Dashboard
                  <MdArrowDropDown />
                </button>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-48"
                  >
                    <Link
                      to="/dashboard/add-service"
                      className={`block px-4 py-2 flex items-center ${
                        isActive("/dashboard/add-service")
                          ? "bg-gray-100"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <FaPlus className="mr-2" /> Add Service
                    </Link>
                    <Link
                      to="/dashboard/manage-service"
                      className={`block px-4 py-2 flex items-center ${
                        isActive("/dashboard/manage-service")
                          ? "bg-gray-100"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <FaTasks className="mr-2" /> Manage Service
                    </Link>
                    <Link
                      to="/dashboard/booked-services"
                      className={`block px-4 py-2 flex items-center ${
                        isActive("/dashboard/booked-services")
                          ? "bg-gray-100"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <FaClipboardList className="mr-2" /> Booked Services
                    </Link>
                    <Link
                      to="/dashboard/service-to-do"
                      className={`block px-4 py-2 flex items-center ${
                        isActive("/dashboard/service-to-do")
                          ? "bg-gray-100"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <FaListUl className="mr-2" /> Service To-Do
                    </Link>
                  </motion.div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src={
                    user?.photoURL ||
                    "https://static.thenounproject.com/png/363640-200.png"
                  }
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span>{user?.displayName}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center hover:text-gray-300"
                >
                  <FaSignOutAlt className="mr-1" /> Logout
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className={`flex items-center ${
                isActive("/login") ? "text-yellow-300" : "hover:text-gray-300"
              }`}
            >
              <FaUserAlt className="mr-1" /> Log-in
            </Link>
          )}
          <DarkModeToggle
            onChange={toggleTheme}
            checked={isDarkMode}
            size={80}
          />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            onClick={handleMobileMenuToggle}
            className="text-xl focus:outline-none"
          >
            <FaBars />
          </button>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`absolute z-20 w-48 rounded shadow-lg right-0 mt-2 ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-blue-600 text-white"
              }`}
            >
              <Link
                to="/"
                className={`block px-4 py-2 flex items-center ${
                  isActive("/") ? "text-yellow-300" : "hover:text-gray-300"
                }`}
              >
                <FaHome className="mr-1" /> Home
              </Link>
              <Link
                to="/services"
                className={`block px-4 py-2 flex items-center ${
                  isActive("/services")
                    ? "text-yellow-300"
                    : "hover:text-gray-300"
                }`}
              >
                <FaServicestack className="mr-1" /> Services
              </Link>
              {user ? (
                <>
                  <button
                    onClick={handleDropdownToggle}
                    className={`block px-4 py-2 flex items-center ${
                      isDropdownOpen
                        ? isDarkMode
                          ? "bg-gray-800 text-white"
                          : "bg-blue-600 text-white"
                        : ""
                    }`}
                  >
                    <MdOutlineDashboard className="mr-1" /> Dashboard
                    <MdArrowDropDown />
                  </button>
                  {isDropdownOpen && (
                    <div
                      className={`${
                        isDarkMode
                          ? "bg-gray-800 text-white"
                          : "bg-blue-600 text-white"
                      }`}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Link
                        to="/dashboard/add-service"
                        className={`block px-4 py-2 flex items-center ${
                          isActive("/dashboard/add-service")
                            ? "text-yellow-300"
                            : "hover:text-gray-300"
                        }`}
                      >
                        <FaPlus className="mr-2" /> Add Service
                      </Link>
                      <Link
                        to="/dashboard/manage-service"
                        className={`block px-4 py-2 flex items-center ${
                          isActive("/dashboard/manage-service")
                            ? "text-yellow-300"
                            : "hover:text-gray-300"
                        }`}
                      >
                        <FaTasks className="mr-2" /> Manage Service
                      </Link>
                      <Link
                        to="/dashboard/booked-services"
                        className={`block px-4 py-2 flex items-center ${
                          isActive("/dashboard/booked-services")
                            ? "text-yellow-300"
                            : "hover:text-gray-300"
                        }`}
                      >
                        <FaClipboardList className="mr-2" /> Booked Services
                      </Link>
                      <Link
                        to="/dashboard/service-to-do"
                        className={`block px-4 py-2 flex items-center ${
                          isActive("/dashboard/service-to-do")
                            ? "text-yellow-300"
                            : "hover:text-gray-300"
                        }`}
                      >
                        <FaListUl className="mr-2" /> Service To-Do
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center px-4 py-2">
                    <img
                      src={
                        user?.photoURL ||
                        "https://static.thenounproject.com/png/363640-200.png"
                      }
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{user?.displayName}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 flex items-center hover:bg-blue-500"
                  >
                    <FaSignOutAlt className="mr-1" /> Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className={`block px-4 py-2 flex items-center ${
                    isActive("/login")
                      ? "text-yellow-300"
                      : "hover:text-gray-300"
                  }`}
                >
                  <FaUserAlt className="mr-1" /> Log-in
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
