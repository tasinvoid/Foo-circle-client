import React, { useState, useContext } from "react";
import { MdOutlineNoFood } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import BarChart01 from "../Components/BarChart01";
import PieChart01 from "../Components/PieChart01";
import { ThemeContext } from "../contexts/ThemeContext";

const DashBoardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  const {
    data: foodData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allFoods"],
    queryFn: async () => {
      const response = await fetch("https://foo-circle.vercel.app/foods");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  let pieChartData = [];
  if (foodData) {
    const totalFoods = foodData.length;
    const availableCount = foodData.filter(
      (food) => food.availability === "available"
    ).length;
    const notAvailableCount = totalFoods - availableCount;

    const availablePercentage =
      totalFoods > 0 ? ((availableCount / totalFoods) * 100).toFixed(0) : 0;
    const notAvailablePercentage =
      totalFoods > 0 ? ((notAvailableCount / totalFoods) * 100).toFixed(0) : 0;

    pieChartData = [
      { name: "Available", value: parseFloat(availablePercentage) },
      { name: "Requested", value: parseFloat(notAvailablePercentage) },
    ];
  }

  const barChartData =
    foodData?.map((item) => ({
      foodName: item.foodName,
      foodQuantity: parseInt(item.foodQuantity) || 0,
    })) || [];

  return (
    <div
      className={`min-h-screen transition-colors duration-500
      ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-800"
      }`}
    >
      <div className="flex flex-row">
        {/* Sidebar */}
        <aside
          className={`sidebar w-64 md:shadow-lg transform transition-transform duration-150 ease-in z-50 relative h-screen
          ${
            theme === "dark"
              ? "bg-gray-900 border-r border-gray-700"
              : "bg-white border-r border-gray-300"
          }
          ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <div className="flex justify-end p-4 md:hidden">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className={`transition ${
                theme === "dark"
                  ? "text-gray-400 hover:text-indigo-400"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="sidebar-header flex items-center justify-center py-4">
            <div className="inline-flex">
              <Link
                to="/"
                className={`flex items-center justify-center gap-2 font-bold tracking-wider
                ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}
              >
                <MdOutlineNoFood className="text-4xl lg:ml-4" />
                <p className="text-xl">Food Circle</p>
              </Link>
            </div>
          </div>
          <div className="sidebar-content px-4 py-6">
            <ul className="flex flex-col w-full">
              <li className="my-px">
                <Link
                  to="/"
                  className={`flex flex-row items-center h-10 px-3 rounded-lg font-semibold
                  ${
                    theme === "dark"
                      ? "text-indigo-400 bg-gray-800 bg-opacity-80 backdrop-blur-sm"
                      : "text-indigo-600 bg-gray-200"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center text-lg
                    ${
                      theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                    }`}
                  >
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </span>
                  <span className="ml-3">Home</span>
                </Link>
              </li>
              <li className="my-px">
                <span
                  className={`flex font-medium text-sm px-4 my-4 uppercase
                  ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                >
                  Services
                </span>
              </li>
              <li className="my-px">
                <Link
                  to="/availableFoods"
                  className={`flex flex-row items-center h-10 px-3 rounded-lg transition-colors duration-200
                  ${
                    theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700 hover:text-indigo-400"
                      : "text-gray-700 hover:bg-gray-200 hover:text-indigo-600"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center text-lg
                    ${
                      theme === "dark"
                        ? "text-gray-500 hover:text-indigo-400"
                        : "text-gray-500 hover:text-indigo-600"
                    }`}
                  >
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </span>
                  <span className="ml-3">All Foods</span>
                </Link>
              </li>
              <li className="my-px">
                <Link
                  to="/manageMyFoods"
                  className={`flex flex-row items-center h-10 px-3 rounded-lg transition-colors duration-200
                  ${
                    theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700 hover:text-indigo-400"
                      : "text-gray-700 hover:bg-gray-200 hover:text-indigo-600"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center text-lg
                    ${
                      theme === "dark"
                        ? "text-gray-500 hover:text-indigo-400"
                        : "text-gray-500 hover:text-indigo-600"
                    }`}
                  >
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </span>
                  <span className="ml-3">Manage Foods</span>
                </Link>
              </li>
              <li className="my-px">
                <Link
                  to="/myFoodReq"
                  className={`flex flex-row items-center h-10 px-3 rounded-lg transition-colors duration-200
                  ${
                    theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700 hover:text-indigo-400"
                      : "text-gray-700 hover:bg-gray-200 hover:text-indigo-600"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center text-lg
                    ${
                      theme === "dark"
                        ? "text-gray-500 hover:text-indigo-400"
                        : "text-gray-500 hover:text-indigo-600"
                    }`}
                  >
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </span>
                  <span className="ml-3">Requested Foods</span>
                </Link>
              </li>
              <li className="my-px">
                <Link
                  to="/addFood"
                  className={`flex flex-row items-center h-10 px-3 rounded-lg transition-colors duration-200
                  ${
                    theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700 hover:text-indigo-400"
                      : "text-gray-700 hover:bg-gray-200 hover:text-indigo-600"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center text-lg
                    ${
                      theme === "dark"
                        ? "text-gray-500 hover:text-indigo-400"
                        : "text-gray-500 hover:text-indigo-600"
                    }`}
                  >
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span className="ml-3">Add Food</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        <main
          className={`main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in
          ${theme === "dark" ? "bg-gray-950" : "bg-gray-100"}`}
        >
          <header
            className={`header shadow py-4 px-4 border-b transition-colors duration-500
            ${
              theme === "dark"
                ? "bg-gray-800 bg-opacity-80 backdrop-blur-sm border-gray-700"
                : "bg-white border-gray-300"
            }`}
          >
            <div className="header-content flex items-center flex-row justify-between">
              <div className="flex md:hidden">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className={`flex items-center justify-center h-10 w-10 transition-colors duration-200
                  ${
                    theme === "dark"
                      ? "text-gray-500 hover:text-indigo-400"
                      : "text-gray-600 hover:text-indigo-600"
                  }`}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>

              <form action="#" className="hidden md:flex flex-grow max-w-sm">
                <div className="relative w-full">
                  <div
                    className={`inline-flex items-center justify-center absolute left-0 top-0 h-full w-10
                    ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    id="search"
                    type="text"
                    name="search"
                    className={`text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border w-full h-10 focus:outline-none transition-colors duration-200
                    ${
                      theme === "dark"
                        ? "border-gray-700 bg-gray-900 text-gray-200 focus:border-indigo-500"
                        : "border-gray-300 bg-gray-100 text-gray-800 focus:border-indigo-600"
                    }`}
                    placeholder="Search..."
                  />
                </div>
              </form>
            </div>
          </header>

          <div className="main-content flex flex-col flex-grow p-4">
            <h1
              className={`font-bold text-3xl mb-4
              ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}
            >
              Dashboard
            </h1>

            {/* Grid for Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 h-80">
              {isLoading ? (
                <div
                  className={`text-center py-10
                  ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                >
                  <p className="text-lg">Loading charts...</p>
                </div>
              ) : isError ? (
                <div
                  className={`text-center py-10
                  ${theme === "dark" ? "text-pink-400" : "text-pink-500"}`}
                >
                  <p className="text-lg">Error: {error.message}</p>
                </div>
              ) : (
                <>
                  <BarChart01 data={barChartData} theme={theme} />
                  <PieChart01 data={pieChartData} theme={theme} />
                </>
              )}
            </div>

            {/* Grid for Food Cards (Empty for now) */}
            {isLoading ? (
              <div
                className={`text-center py-10
                ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
              >
                <p className="text-lg">Loading food data...</p>
              </div>
            ) : isError ? (
              <div
                className={`text-center py-10
                ${theme === "dark" ? "text-pink-400" : "text-pink-500"}`}
              >
                <p className="text-lg">Error: {error.message}</p>
                <p
                  className={`${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Could not fetch data. Please check the server.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4"></div>
            )}
          </div>

          <footer
            className={`footer px-4 py-6 border-t transition-colors duration-500
            ${
              theme === "dark"
                ? "bg-gray-900 border-gray-700"
                : "bg-white border-gray-300"
            }`}
          >
            <div className="footer-content">
              <p
                className={`text-sm text-center
                ${theme === "dark" ? "text-gray-500" : "text-gray-600"}`}
              >
                © Food Circle 2025. All rights reserved.{" "}
                <a
                  href="https://github.com/tasinvoid"
                  className={`
                  ${
                    theme === "dark"
                      ? "text-indigo-400 hover:text-indigo-500"
                      : "text-indigo-600 hover:text-indigo-700"
                  }`}
                >
                  by tasinvoid
                </a>
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
