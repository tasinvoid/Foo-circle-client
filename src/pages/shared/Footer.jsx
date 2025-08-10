import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { ThemeContext } from "../../contexts/ThemeContext";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer
      className={`mt-0 shadow-inner border-t transition-colors duration-500
      ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100 border-gray-700"
          : "bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-800 border-gray-300"
      }`}
    >
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo and Tagline */}
          <div className="space-y-4">
            <Link
              to="/"
              className={`text-3xl font-bold transition-colors duration-200
              ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}
            >
              FoodShare
            </Link>
            <p
              className={`text-sm
              ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
            >
              Connecting surplus food with those who need it most.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4
              className={`text-lg font-semibold
              ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
            >
              Quick Links
            </h4>
            <ul
              className={`space-y-2
              ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
            >
              <li>
                <Link
                  to="/"
                  className={`hover:text-indigo-400 transition-colors duration-200
                  ${
                    theme === "dark"
                      ? "hover:text-indigo-400"
                      : "hover:text-indigo-600"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/availableFoods"
                  className={`hover:text-indigo-400 transition-colors duration-200
                  ${
                    theme === "dark"
                      ? "hover:text-indigo-400"
                      : "hover:text-indigo-600"
                  }`}
                >
                  Available Foods
                </Link>
              </li>
              <li>
                <Link
                  to="/addFood"
                  className={`hover:text-indigo-400 transition-colors duration-200
                  ${
                    theme === "dark"
                      ? "hover:text-indigo-400"
                      : "hover:text-indigo-600"
                  }`}
                >
                  Add a Food
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`hover:text-indigo-400 transition-colors duration-200
                  ${
                    theme === "dark"
                      ? "hover:text-indigo-400"
                      : "hover:text-indigo-600"
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4
              className={`text-lg font-semibold
              ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
            >
              Follow Us
            </h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61573135861799"
                className={`transition-colors duration-200
                ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-indigo-400"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://github.com/tasinvoid"
                className={`transition-colors duration-200
                ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-indigo-400"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                <FaGithub size={24} />
              </a>
              <a
                href="www.linkedin.com/in/shoaib-mahmud-tasin"
                className={`transition-colors duration-200
                ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-indigo-400"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div
          className={`mt-8 pt-8 text-center text-sm
          ${
            theme === "dark"
              ? "border-t border-gray-800 text-gray-500"
              : "border-t border-gray-300 text-gray-500"
          }`}
        >
          <p>
            &copy; {new Date().getFullYear()} FoodShare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
