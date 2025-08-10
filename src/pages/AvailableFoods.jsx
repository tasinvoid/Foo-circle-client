import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ThemeContext } from "../contexts/ThemeContext";

const AvailableFoods = () => {
  const { theme } = useContext(ThemeContext);
  console.log(theme);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const {
    data: availableFoods,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["availableFoods", sortOrder],
    queryFn: async () => {
      const res = await fetch(
        `https://foo-circle.vercel.app/allFoods?sortOrder=${sortOrder}`
      );
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950"
            : "bg-gray-200"
        }`}
      >
        <span className="loading loading-spinner text-indigo-400"></span>
      </div>
    );
  }
  if (isError) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        <p>Error loading data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-8 lg:px-20 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100"
          : "bg-gray-200 text-gray-800"
      }`}
    >
      {/* Filter controls */}
      <div className="flex justify-center md:justify-end mb-6 space-x-4">
        <button
          onClick={() => setSortOrder("asc")}
          className={`py-2 px-4 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${
            sortOrder === "asc"
              ? "bg-indigo-600 text-gray-100"
              : theme === "dark"
              ? "bg-gray-800 text-gray-300 hover:bg-indigo-700"
              : "bg-gray-300 text-gray-800 hover:bg-gray-400"
          }`}
        >
          Quantity: Low to High
        </button>
        <button
          onClick={() => setSortOrder("desc")}
          className={`py-2 px-4 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${
            sortOrder === "desc"
              ? "bg-indigo-600 text-gray-100"
              : theme === "dark"
              ? "bg-gray-800 text-gray-300 hover:bg-indigo-700"
              : "bg-gray-300 text-gray-800 hover:bg-gray-400"
          }`}
        >
          Quantity: High to Low
        </button>
      </div>

      {/* Food cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-7 mt-5 ">
        {availableFoods.map((food) => (
          <div
            key={food._id}
            className={`p-4 h-[500px] rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between ${
              theme === "dark"
                ? "bg-gray-800 bg-opacity-80 backdrop-blur-sm border border-gray-700 hover:border-indigo-500 text-gray-100"
                : "bg-gray-100 bg-opacity-80 backdrop-blur-sm border border-gray-300 hover:border-indigo-500 text-gray-900"
            }`}
          >
            <img
              src={
                food.photoURL
                  ? food.photoURL
                  : "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small_2x/default-avatar-photo-placeholder-profile-icon-vector.jpg"
              }
              alt={food.foodName}
              className="w-full h-52 object-cover rounded-lg"
            />
            <div className="p-4 text-center flex-grow flex flex-col justify-center">
              <h2
                className={`text-2xl font-bold mb-2 truncate ${
                  theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                }`}
              >
                {food.foodName}
              </h2>
              <p className="text-xl mb-1">
                <span
                  className={`${
                    theme === "dark" ? "text-pink-400" : "text-pink-600"
                  }`}
                >
                  Quantity:
                </span>{" "}
                {food.foodQuantity}
              </p>
              <p className="text-xl mb-1">
                <span
                  className={`${
                    theme === "dark" ? "text-pink-400" : "text-pink-600"
                  }`}
                >
                  Location:
                </span>{" "}
                {food.pickupLocation}
              </p>
              <p
                className={`text-lg mt-2 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Shared by: <span className="font-semibold">{food.Name}</span>
              </p>
            </div>
            <div className="p-4 pt-0">
              <Link to={`/availableFoods/${food._id}`}>
                <button className="w-full text-lg font-semibold text-gray-100 py-2 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
