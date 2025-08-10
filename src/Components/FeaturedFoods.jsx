import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Correct import for Link
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { motion } from "framer-motion";

const FeaturedFoods = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const {
    data: featuredFoods,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["featuredFoods"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/featuredFoods");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
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
      <div className="text-center text-pink-400 font-bold mt-10">
        Error loading featured foods. Please try again later.
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="my-10">
      <div className="mx-4 sm:mx-10 max-w-[1700px] w-full ">
        <motion.h1
          className={`text-4xl font-bold mt-10 mb-5 text-center drop-shadow-lg ${
            theme === "dark" ? "text-indigo-400" : "text-indigo-600"
          }`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Featured Foods
        </motion.h1>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5 justify-center items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {featuredFoods.map((data, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
              }}
              className={`bg-opacity-80 backdrop-blur-sm p-6 rounded-2xl shadow-xl 
                         border transition-all duration-300 relative group
                         ${
                           theme === "dark"
                             ? "bg-gray-800 text-gray-100 border-gray-700 hover:border-indigo-500"
                             : "bg-white text-gray-800 border-gray-300 hover:border-indigo-600"
                         }`}
            >
              <h3
                className={`text-2xl font-semibold mb-2 ${
                  theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                }`}
              >
                {data.foodName}
              </h3>
              <p
                className={`text-sm mb-4 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <span className="font-bold">Donator:</span> {data.Email}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div
                  className={`flex items-center ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  <span
                    className={`mr-2 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Quantity:
                  </span>
                  <span
                    className={`text-xl font-bold ${
                      theme === "dark" ? "text-pink-400" : "text-pink-600"
                    }`}
                  >
                    {data.foodQuantity}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center mt-10">
        {user ? (
          <Link to={"/availableFoods"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`btn font-bold py-3 px-8 rounded-full shadow-lg transition-colors duration-300 border-none
                          ${
                            theme === "dark"
                              ? "bg-indigo-600 hover:bg-indigo-700 text-gray-100"
                              : "bg-indigo-600 hover:bg-indigo-700 text-white"
                          }`}
            >
              Show All Foods
            </motion.button>
          </Link>
        ) : (
          <Link to={"/login"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`btn font-bold py-3 px-8 rounded-full shadow-lg transition-colors duration-300 border-none
                          ${
                            theme === "dark"
                              ? "bg-indigo-600 hover:bg-indigo-700 text-gray-100"
                              : "bg-indigo-600 hover:bg-indigo-700 text-white"
                          }`}
            >
              Login to Show All Foods
            </motion.button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default FeaturedFoods;