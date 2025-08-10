import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const UsersRequestedFoods = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const currentUserEmail = user.email;
  const {
    data: currentUserRequestedFoods,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["currentUserRequestedFoods", currentUserEmail],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/requestedFoods?Email=${currentUserEmail}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div
        className={`flex justify-center items-center h-screen transition-colors duration-500
          ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950"
              : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200"
          }`}
      >
        <span
          className={`loading loading-spinner ${
            theme === "dark" ? "text-indigo-400" : "text-indigo-600"
          }`}
        ></span>
      </div>
    );
  }
  if (isError) {
    return (
      <div
        className={`flex justify-center items-center h-screen transition-colors duration-500
          ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100"
              : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-800"
          }`}
      >
        <p>Error loading data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-500
        ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100"
            : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-800"
        }`}
    >
      <h1
        className={`text-3xl lg:text-4xl font-bold text-center mb-8
          ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}
      >
        Your Requested Foods
      </h1>
      <div
        className={`overflow-x-auto rounded-lg border backdrop-blur-sm shadow-lg
          ${
            theme === "dark"
              ? "border-gray-700 bg-gray-800 bg-opacity-80"
              : "border-gray-300 bg-gray-100 bg-opacity-80"
          }`}
      >
        <table
          className={`table table-auto w-full
          ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
        >
          {/* head */}
          <thead>
            <tr
              className={`uppercase text-sm border-b
                ${
                  theme === "dark"
                    ? "bg-gray-900 text-gray-100 border-gray-700"
                    : "bg-gray-200 text-gray-800 border-gray-300"
                }`}
            >
              <th className="p-4 hidden lg:table-cell">#</th>
              <th className="p-4 text-left">Food Details</th>
              <th className="p-4 hidden md:table-cell">Expiry Date</th>
              <th className="p-4 hidden lg:table-cell">Quantity</th>
              <th className="p-4 hidden sm:table-cell">Request Time</th>
            </tr>
          </thead>
          <tbody>
            {currentUserRequestedFoods?.map((userData, index) => (
              <tr
                key={userData._id}
                className={`transition-colors duration-200 border-b
                  ${
                    theme === "dark"
                      ? "hover:bg-gray-700 border-gray-700"
                      : "hover:bg-gray-200 border-gray-300"
                  }`}
              >
                <th className="p-4 hidden lg:table-cell">{index + 1}</th>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={`${userData.photoURL}`}
                          alt={`${userData.foodName}`}
                        />
                      </div>
                    </div>
                    <div>
                      <div
                        className={`font-bold ${
                          theme === "dark" ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {userData.foodName}
                      </div>
                      <div
                        className={`text-sm opacity-70 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {userData.pickupLocation}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell">
                  {userData.expiredDate}
                </td>
                <td className="p-4 hidden lg:table-cell text-center">
                  {userData.foodQuantity}
                </td>
                <td className="p-4 hidden sm:table-cell">
                  {userData.requestTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersRequestedFoods;