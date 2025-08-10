import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { ThemeContext } from "../contexts/ThemeContext"; // Import ThemeContext

const fetchFoods = async () => {
  const response = await fetch("https://foo-circle.vercel.app/foods");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Reviews = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme

  const {
    data: foods,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["foods"],
    queryFn: fetchFoods,
  });

  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen ${
          theme === "dark"
            ? "bg-gray-950 text-gray-200"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        <p
          className={`text-xl ${
            theme === "dark" ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Loading reviews...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen ${
          theme === "dark"
            ? "bg-gray-950 text-gray-200"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        <p className="text-xl text-pink-500">Error: {error.message}</p>
      </div>
    );
  }

  const reviews = foods.filter(
    (food) => food.additionalNotes && food.additionalNotes !== "Enter notes"
  );

  return (
    <div
      className={` p-8 transition-colors duration-500 max-w-[1700px] w-full rounded-2xl
      ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-800"
      }`}
    >
      <h2
        className={`text-4xl font-bold text-center mb-10
        ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}
      >
        User Reviews
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.length > 0 ? (
          reviews.map((food) => (
            <div
              key={food._id}
              className={`bg-opacity-80 backdrop-blur-sm p-6 rounded-lg shadow-lg border transition-all duration-300
                ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 hover:border-indigo-500"
                    : "bg-white border-gray-300 hover:border-indigo-600"
                }`}
            >
              <div className="flex items-center mb-4">
                <img
                  src={
                    food.photoURL ||
                    "https://i.ibb.co/6Pq7pXw/default-avatar.png"
                  }
                  alt={food.Name}
                  className={`w-12 h-12 rounded-full object-cover border-2
                    ${
                      theme === "dark"
                        ? "border-indigo-500"
                        : "border-indigo-600"
                    }`}
                />
                <div className="ml-4">
                  <h3
                    className={`text-xl font-semibold
                    ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}
                  >
                    {food.Name}
                  </h3>
                </div>
              </div>
              <p
                className={`italic
                ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
              >
                "{food.additionalNotes}"
              </p>
            </div>
          ))
        ) : (
          <p
            className={`text-center col-span-full text-lg
            ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
          >
            No reviews available yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
