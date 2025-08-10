// Navbar Component
import { PiPlantFill } from "react-icons/pi";
import { useContext } from "react";
import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Navigate, NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { PiBowlFoodFill } from "react-icons/pi";

const Navbar = () => {
  //const { theme, changeTheme } = useContext(ThemeContext);
  const { user, signOutUser } = useContext(AuthContext);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = (
    <>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/availableFoods"}>Available Foods</NavLink>

      {user && (
        <>
          <NavLink to={"/addFood"}>Add a Food</NavLink>
          <NavLink to={"/myFoodReq"}>My Requested Foods</NavLink>
          <NavLink to={"/manageMyFoods"}>Manage My Foods</NavLink>
        </>
      )}

      {!user && (
        <>
          <NavLink to={"/register"}>Register</NavLink>
          <NavLink to={"/login"}>Login</NavLink>
        </>
      )}
    </>
  );
  function handleLogout() {
    signOutUser().then(() => console.log("user logged out"));
  }

  return (
    <nav className="bg-yellow-500  text-gray-700 font-bold rounded-2xl">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="md:hidden  flex gap-1">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 hover:text-gray-600"
            aria-label="Toggle Mobile Menu" // Add accessibility label
          >
            {isMobileMenuOpen ? (
              <XIcon className="w-6 h-6 text-black" />
            ) : (
              <MenuIcon className="w-6 h-6 text-black" />
            )}
          </button>

          {/* Mobile Menu Content */}
          {isMobileMenuOpen && !user && (
            <div className="flex flex-col gap-5 ">
              <Sidebar>
                <Menu>
                  <MenuItem>
                    {" "}
                    <NavLink to={"/"}>Home</NavLink>{" "}
                  </MenuItem>
                  <MenuItem>
                    {" "}
                   <NavLink to={"/availableFoods"}>Available Foods</NavLink>
                  </MenuItem>
                  
                  <MenuItem>
                    {" "}
                    <NavLink to={"/register"}>Register</NavLink>
                  </MenuItem>
                  <MenuItem>
                    {" "}
                    <NavLink to={"/login"}>Login</NavLink>
                  </MenuItem>
                </Menu>
              </Sidebar>
            </div>
          )}
          {isMobileMenuOpen && user && (
            <div className="flex flex-col gap-5">
              <Sidebar>
                <Menu>
                  <MenuItem>
                    {" "}
                    <NavLink to={"/"}>Home</NavLink>{" "}
                  </MenuItem>
                  <MenuItem>
                    {" "}
                    <NavLink to={"/availableFoods"}>Available Foods</NavLink>{" "}
                  </MenuItem>
                  <MenuItem>
                    {" "}
                    <NavLink to={"/addFood"}>Add a Food</NavLink>{" "}
                  </MenuItem>
                  <MenuItem>
                    {" "}
                    <NavLink to={"/manageMyFoods"}>Manage My Foods</NavLink>{" "}
                  </MenuItem>
                  <MenuItem>
                    {" "}
                    <NavLink to={"/myFoodReq"}>My Requested Foods</NavLink>{" "}
                  </MenuItem>
                  <MenuItem>
                    <a onClick={handleLogout}>Logout</a>
                  </MenuItem>
                </Menu>
              </Sidebar>
            </div>
          )}
        </div>
        {isMobileMenuOpen ? (
          <div>
            <div className="hidden">
              <NavLink
                className="btn btn-ghost text-xl font-3xl bg-yellow-600 italic rounded-4xl
          "
                to={"/"}
              >
                Sproutly <PiPlantFill />
              </NavLink>
            </div>
            {user ? (
              <div className=" flex-none">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar group hover:w-60 z-1 "
                  >
                    <div className="relative  h-10 rounded-full   group-hover:rounded-none group-hover:h-40">
                      <img
                        alt="User Avatar"
                        src={user.photoURL}
                        className="group-hover:opacity-0"
                      />

                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 top-18">
                        <p className="text-white text-xs font-semibold  ">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content text-gray-200 bg-gray-800 rounded-box z-1 mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <a className="justify-between">
                        {user && user.displayName}
                        <span className="badge">New</span>
                      </a>
                    </li>

                    <li>
                      <a onClick={handleLogout}>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div className="">
            <NavLink
              className="btn btn-ghost text-xl font-3xl md:text-sm bg-yellow-300 italic rounded-4xl
          "
              to={"/"}
            >
              Food Circle <PiBowlFoodFill />
            </NavLink>
          </div>
        )}

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="r flex gap-8 md:text-sm">{links}</div>
        </div>

        {user ? (
          <div className=" flex-none hidden lg:block">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar group hover:w-60 z-1 "
              >
                <div className="relative  h-10 rounded-full   group-hover:rounded-none group-hover:h-40">
                  <img
                    alt="User Avatar"
                    src={user.photoURL}
                    className="group-hover:opacity-0"
                  />

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 top-18">
                    <p className="text-white text-xs font-semibold  ">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content text-black-200 font-extrabold bg-yellow-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
