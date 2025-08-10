import React, { useContext } from "react";
import {
  MdOutlineInsertDriveFile,
  MdOutlineAddCircleOutline,
  MdOutlineInfo,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

const NoDataFound = ({
  icon: Icon = MdOutlineInsertDriveFile,
  title = "No Data Available",
  description = "It looks like there's no data to display here yet. To get started, please add some new entries.",
  primaryButtonText = "Add New",
  secondaryButtonText,
  onSecondaryButtonClick,
  illustration: IllustrationComponent,
}) => {
  const { theme } = useContext(ThemeContext);

  const primaryButtonClasses = `
    flex items-center justify-center
    py-3 px-8 rounded-full
    text-lg font-medium tracking-wide
    shadow-md
    focus:outline-none focus:ring-4
    transition duration-300 ease-in-out transform hover:-translate-y-0.5
    w-full sm:w-auto
    ${
      theme === "dark"
        ? "bg-indigo-600 text-gray-100 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-opacity-70"
        : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-400 focus:ring-opacity-70"
    }
  `;

  return (
    <div
      className={`
      flex flex-col items-center justify-center
      p-8 sm:p-10 md:p-12
      max-w-md mx-auto
      rounded-2xl shadow-xl border
      text-center font-sans
      transform transition-transform duration-300 ease-out
      relative overflow-hidden
      ${
        theme === "dark"
          ? "bg-gray-800 bg-opacity-80 backdrop-blur-sm border-gray-700 text-gray-100"
          : "bg-white border-gray-300 text-gray-800"
      }`}
    >
      {IllustrationComponent ? (
        <div className="mb-6">
          <IllustrationComponent className={`w-24 h-24 mb-6 ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`} />
        </div>
      ) : (
        <Icon className={`w-16 h-16 mb-6 ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`} />
      )}

      <h2
        className={`text-3xl font-bold mb-3 leading-tight
        ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}
      >
        {title}
      </h2>

      <p
        className={`text-base sm:text-lg mb-8 leading-relaxed
        ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
      >
        {description}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        {primaryButtonText && (
          <Link to={"/addFood"} className={primaryButtonClasses}>
            <MdOutlineAddCircleOutline className="mr-2 text-xl" />
            {primaryButtonText}
          </Link>
        )}

        {secondaryButtonText && onSecondaryButtonClick && (
          <button
            onClick={onSecondaryButtonClick}
            className={`
              flex items-center justify-center
              py-3 px-8 rounded-full
              text-lg font-medium tracking-wide
              shadow-md
              hover:bg-gray-700 focus:outline-none focus:ring-4
              transition duration-300 ease-in-out transform hover:-translate-y-0.5
              w-full sm:w-auto
              ${
                theme === "dark"
                  ? "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600 focus:ring-gray-500 focus:ring-opacity-70"
                  : "bg-gray-300 text-gray-800 border-gray-400 hover:bg-gray-400 focus:ring-gray-400 focus:ring-opacity-70"
              }`}
          >
            {secondaryButtonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default NoDataFound;