import React, { useContext } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { ThemeContext } from "../contexts/ThemeContext";
import { Link } from "react-router";

const HomePageHero = () => {
  const { theme } = useContext(ThemeContext);

  // Animation variants for different elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Delay children animations
      },
    },
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.8, 
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };
  const textArray = [
    "Connecting",
    "surplus",
    "food",
    "with",
    "those",
    "who",
    "need",
    "it",
    "most",
    "in",
    "Dhaka.",
    "Join",
    "us",
    "in",
    "reducing",
    "waste",
    "and",
    "building",
    "a",
    "stronger",
    "community.",
  ];
  return (
    <motion.section
      className={`relative flex flex-col lg:flex-row items-center justify-center min-h-[60vh] py-16 px-4 
                  text-center lg:text-left overflow-hidden rounded-2xl border max-w-[1700px] w-full 
                  ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100 shadow-2xl shadow-indigo-500/20 border-gray-700"
                      : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-800 shadow-2xl shadow-gray-300/40 border-gray-300"
                  }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Content Section */}
      <div className="lg:w-1/2 p-5 z-10 lg:pl-25">
        <motion.h1
          className={`text-5xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg
          ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}
          variants={textVariants}
        >
          Share Food, <br /> Nourish Hope.
        </motion.h1>
        <motion.div
          className={`text-xl md:text-3xl mb-8 max-w-xl mx-auto lg:mx-0 drop-shadow-md
          ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
          variants={textVariants}
        >
          Connecting surplus food with those who need it most in Dhaka.
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString(
                  " Join us in reducing waste and building a stronger community."
                )
                .callFunction(() => {
                  console.log("String typed out!");
                })
                .pauseFor(2500)
                .callFunction(() => {
                  console.log("All strings were deleted");
                })
                .start();
            }}
          />
        </motion.div>
        <motion.div variants={textVariants}>
          <Link to={'/addFood'}>
          <button
            className={`btn font-bold py-3 px-8 rounded-full shadow-lg 
                       transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-none
                       ${
                         theme === "dark"
                           ? "bg-indigo-600 hover:bg-indigo-700 text-gray-100 hover:shadow-indigo-500/30"
                           : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-600/30"
                       }`}
          >
            Start Sharing Today
          </button>
          </Link>
          
        </motion.div>
      </div>

      {/* Image Section */}
      <motion.div
        className="lg:w-1/2 p-4 mt-10 lg:mt-0 flex justify-center items-center"
        variants={imageVariants}
      >
        <img
          src="https://i.ibb.co.com/WW5vVQvH/istockphoto-1392528328-612x612.jpg"
          alt="Community Food Sharing"
          className={`rounded-full object-cover w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 
                     border-4 transition-all duration-300 hover:scale-105
                     ${
                       theme === "dark"
                         ? "shadow-2xl shadow-indigo-500/40 border-indigo-500"
                         : "shadow-2xl shadow-gray-400/40 border-indigo-600"
                     }`}
        />
      </motion.div>

      {/* Optional: Subtle background pattern or element for visual interest */}
      <div
        className={`absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl translate-x-1/2 translate-y-1/2
          ${
            theme === "dark"
              ? "bg-indigo-500 opacity-10"
              : "bg-indigo-300 opacity-20"
          }`}
      ></div>
      <div
        className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2
          ${
            theme === "dark"
              ? "bg-pink-500 opacity-10"
              : "bg-pink-300 opacity-20"
          }`}
      ></div>
    </motion.section>
  );
};

export default HomePageHero;
