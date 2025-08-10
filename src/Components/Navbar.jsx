// src/components/Navbar.jsx
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { NavLink } from "react-router-dom";
import { MdOutlineNoFood } from "react-icons/md";
import ThemeToggleButton from "./ThemeToggleButton";

const Navbar = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  function handleLogout() {
    signOutUser().then(() => console.log("user logged out"));
  }
console.log(user);
  const navLinkClass = ({ isActive }) =>
    `font-semibold transition-all duration-300 ease-in-out px-4 py-2 rounded-lg relative overflow-hidden group 
    ${
      isActive
        ? theme === "dark"
          ? "text-indigo-400"
          : "text-indigo-600 bg-gray-200 shadow-sm"
        : theme === "dark"
        ? "text-gray-200 hover:text-indigo-400 hover:bg-gray-800"
        : "text-gray-600 hover:text-indigo-600 hover:bg-gray-200"
    }`;

  const dropdownLinkClass = ({ isActive }) =>
    `font-semibold transition-all duration-300 ease-in-out px-4 py-2 rounded-lg w-full text-left
    ${
      isActive
        ? "bg-indigo-600 text-gray-100 shadow-lg transform scale-105"
        : theme === "dark"
        ? "text-gray-200 hover:text-indigo-400 hover:bg-gray-800"
        : "text-gray-800 hover:text-indigo-600 hover:bg-gray-200"
    }`;

  const AnimatedLink = ({ to, children }) => (
    <NavLink to={to} className={navLinkClass}>
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 
          ${theme === "dark" ? "bg-indigo-500" : "bg-indigo-200"}`}
      ></span>
      <span
        className={`absolute inset-0 opacity-0 group-focus:opacity-10 transition-opacity duration-300 
          ${theme === "dark" ? "bg-indigo-600" : "bg-indigo-300"}`}
      ></span>
    </NavLink>
  );

  const links = (
    <>
      <AnimatedLink to="/">Home</AnimatedLink>
      <AnimatedLink to="/availableFoods">Available Foods</AnimatedLink>
      {user && (
        <>
          <AnimatedLink to="/addFood">Add a Food</AnimatedLink>
          <AnimatedLink to="/myFoodReq">My Requested Foods</AnimatedLink>
          <AnimatedLink to="/manageMyFoods">Manage My Foods</AnimatedLink>
          <AnimatedLink to="/dashBoard">DashBoard</AnimatedLink>
        </>
      )}
      {!user && (
        <>
          <AnimatedLink to="/register">Register</AnimatedLink>
          <AnimatedLink to="/login">Login</AnimatedLink>
        </>
      )}
    </>
  );

  return (
    <div
      className={`sticky navbar transition-all duration-500 hover:translate-y-0 z-50 top-0 mt-2
      ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 bg-opacity-80 backdrop-blur-sm shadow-2xl shadow-indigo-500/20 border border-gray-700 text-gray-100 p-4 transform -translate-y-2"
          : "bg-gray-100 bg-opacity-80 backdrop-blur-sm shadow-lg shadow-gray-300/20 border border-gray-300 text-gray-800 p-4"
      }`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content rounded-box z-[5] mt-3 w-52 p-2 shadow-lg 
            ${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-300"
            }`}
          >
            <li className="space-y-2">
              <NavLink to="/" className={dropdownLinkClass}>
                Home
              </NavLink>
              <NavLink to="/availableFoods" className={dropdownLinkClass}>
                Available Foods
              </NavLink>
              {user && (
                <>
                  <NavLink to="/addFood" className={dropdownLinkClass}>
                    Add a Food
                  </NavLink>
                  <NavLink to="/myFoodReq" className={dropdownLinkClass}>
                    My Requested Foods
                  </NavLink>
                  <NavLink to="/manageMyFoods" className={dropdownLinkClass}>
                    Manage My Foods
                  </NavLink>
                  <NavLink to="/dashBoard" className={dropdownLinkClass}>
                    DashBoard
                  </NavLink>
                </>
              )}
              {!user && (
                <>
                  <NavLink to="/register" className={dropdownLinkClass}>
                    Register
                  </NavLink>
                  <NavLink to="/login" className={dropdownLinkClass}>
                    Login
                  </NavLink>
                </>
              )}
            </li>
          </ul>
        </div>
        <a
          href="/"
          className={`flex items-center justify-center gap-2 font-bold tracking-wider 
          ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}
        >
          <MdOutlineNoFood className="text-4xl lg:ml-4" />
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex gap-1">
          <div className="flex items-center justify-center gap-4">{links}</div>
        </ul>
      </div>

      <div className="navbar-end">
        <ThemeToggleButton  />
        {user && !loading ? (
          <div className="dropdown dropdown-end ml-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar group hover:w-50 z-1"
            >
              <div className="relative h-10 rounded-full group-hover:rounded-none group-hover:h-40">
                <img
                  alt="User Avatar"
                  src={user.photoURL}
                  className="group-hover:opacity-0"
                />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 top-18">
                  <p className="text-white text-xs">{user.email}</p>
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow-lg 
              ${
                theme === "dark"
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-300"
              }`}
            >
              <li>
                <a
                  onClick={handleLogout}
                  className={`font-bold
                  ${
                    theme === "dark"
                      ? "text-indigo-400 hover:bg-gray-700"
                      : "text-indigo-600 hover:bg-gray-200"
                  }`}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              <NavLink
                to="/register"
                className={`btn btn-outline border transition-colors duration-300 shadow-md hover:shadow-lg
                  ${
                    theme === "dark"
                      ? "text-indigo-400 hover:bg-indigo-600 hover:text-gray-100 border-indigo-500 hover:shadow-indigo-500/30"
                      : "text-indigo-600 hover:bg-indigo-600 hover:text-white border-indigo-600 hover:shadow-indigo-600/30"
                  }`}
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className={`btn border-none transition-colors duration-300 shadow-md hover:shadow-lg
                  ${
                    theme === "dark"
                      ? "text-gray-100 bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/30"
                      : "text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-600/30"
                  }`}
              >
                Login
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
