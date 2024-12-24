import { useState } from "react";
import { Link } from "react-router";
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

const Navbar = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img
          src="/logo.png"
          alt="ServiceSphere Logo"
          className="w-8 h-8 mr-2"
        />
        <span className="text-xl font-bold">ServiceSphere</span>
      </div>

      <div className="hidden md:flex space-x-4">
        <Link to="/" className="flex items-center hover:text-gray-300">
          <FaHome className="mr-1" /> Home
        </Link>
        <Link to="/services" className="flex items-center hover:text-gray-300">
          <FaServicestack className="mr-1" /> Services
        </Link>
        {user ? (
          <>
            <div className="relative">
              <button
                onClick={handleDropdownToggle}
                className="flex items-center hover:text-gray-300"
              >
                <MdOutlineDashboard className="mr-1" /> Dashboard{" "}
                <MdArrowDropDown />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg">
                  <Link
                    to="/dashboard/add-service"
                    className="block px-4 py-2 flex items-center hover:bg-gray-100"
                  >
                    <FaPlus className="mr-2" /> Add Service
                  </Link>
                  <Link
                    to="/dashboard/manage-service"
                    className="block px-4 py-2 flex items-center hover:bg-gray-100"
                  >
                    <FaTasks className="mr-2" /> Manage Service
                  </Link>
                  <Link
                    to="/dashboard/booked-services"
                    className="block px-4 py-2 flex items-center hover:bg-gray-100"
                  >
                    <FaClipboardList className="mr-2" /> Booked Services
                  </Link>
                  <Link
                    to="/dashboard/service-to-do"
                    className="block px-4 py-2 flex items-center hover:bg-gray-100"
                  >
                    <FaListUl className="mr-2" /> Service To-Do
                  </Link>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {user?.image && (
                <img
                  src={user?.image}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span>{user?.name}</span>
              <button
                onClick={onLogout}
                className="flex items-center hover:text-gray-300"
              >
                <FaSignOutAlt className="mr-1" /> Logout
              </button>
            </div>
          </>
        ) : (
          <Link to="/login" className="flex items-center hover:text-gray-300">
            <FaUserAlt className="mr-1" /> Log-in
          </Link>
        )}
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
          <div className="absolute right-0 mt-2 bg-blue-600 rounded shadow-lg text-white w-48">
            <Link
              to="/"
              className="block px-4 py-2 flex items-center hover:bg-blue-500"
            >
              <FaHome className="mr-1" /> Home
            </Link>
            <Link
              to="/services"
              className="block px-4 py-2 flex items-center hover:bg-blue-500"
            >
              <FaServicestack className="mr-1" /> Services
            </Link>
            {user ? (
              <>
                <button
                  onClick={handleDropdownToggle}
                  className="block px-4 py-2 flex items-center hover:bg-blue-500"
                >
                  <MdOutlineDashboard className="mr-1" /> Dashboard{" "}
                  <MdArrowDropDown />
                </button>
                {isDropdownOpen && (
                  <div className="bg-blue-700 text-white">
                    <Link
                      to="/dashboard/add-service"
                      className="block px-4 py-2 flex items-center hover:bg-blue-500"
                    >
                      <FaPlus className="mr-2" /> Add Service
                    </Link>
                    <Link
                      to="/dashboard/manage-service"
                      className="block px-4 py-2 flex items-center hover:bg-blue-500"
                    >
                      <FaTasks className="mr-2" /> Manage Service
                    </Link>
                    <Link
                      to="/dashboard/booked-services"
                      className="block px-4 py-2 flex items-center hover:bg-blue-500"
                    >
                      <FaClipboardList className="mr-2" /> Booked Services
                    </Link>
                    <Link
                      to="/dashboard/service-to-do"
                      className="block px-4 py-2 flex items-center hover:bg-blue-500"
                    >
                      <FaListUl className="mr-2" /> Service To-Do
                    </Link>
                  </div>
                )}
                <div className="flex items-center px-4 py-2">
                  {user?.image && (
                    <img
                      src={user?.image}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}
                  <span>{user?.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="block w-full text-left px-4 py-2 flex items-center hover:bg-blue-500"
                >
                  <FaSignOutAlt className="mr-1" /> Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-4 py-2 flex items-center hover:bg-blue-500"
              >
                <FaUserAlt className="mr-1" /> Log-in
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
