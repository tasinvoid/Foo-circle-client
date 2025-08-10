import React, { useEffect, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ThemeContext } from "../contexts/ThemeContext";

const FoodHandlingEssentials = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div
      className={`${
        theme === "dark" ? "text-gray-100" : "text-gray-800"
      } p-4 sm:p-8 max-w-[1500px] mx-auto my-12`}
    >
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 text-center drop-shadow-lg ${
          theme === "dark" ? "text-indigo-400" : "text-indigo-600"
        }`}
        data-aos="fade-up"
      >
        Food Handling & Sharing Essentials
      </h2>
      <p
        className={`text-lg mb-8 leading-relaxed text-center max-w-3xl mx-auto ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Ensuring food safety and convenience is key to successful food sharing.
        Here's a rundown of essential items for preparing, storing, and
        transporting food safely.
      </p>

      <div className="gap-8 flex flex-col lg:flex-row">
        <section
          className={`flex-1 p-6 sm:p-8 bg-opacity-80 backdrop-blur-sm rounded-lg shadow-xl border transition-all duration-300
                      ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 hover:border-indigo-500"
                          : "bg-gray-100 border-gray-300 hover:border-indigo-600"
                      }`}
          data-aos="fade-right"
          data-aos-delay="400"
        >
          <h3
            className={`text-3xl sm:text-3xl font-bold mb-4 border-b-2 pb-3 
                        ${
                          theme === "dark"
                            ? "text-indigo-400 border-indigo-600"
                            : "text-indigo-600 border-indigo-600"
                        }`}
          >
            Kitchen Tools for Preparation
          </h3>
          <ul
            className={`list-disc pl-6 space-y-3 text-base sm:text-lg 
                        ${
                          theme === "dark" ? "text-gray-200" : "text-gray-700"
                        }`}
          >
            <li className="list-item">
              <strong>Cutting Boards (Separate):</strong> Use different boards
              for raw meat/poultry and ready-to-eat foods to prevent
              cross-contamination.
            </li>
            <li className="list-item">
              <strong>Sharp Knives:</strong> Essential for safe and efficient
              food preparation, from slicing produce to portioning cooked meals.
            </li>
            <li className="list-item">
              <strong>Food Thermometer:</strong> Crucial for ensuring meats and
              cooked dishes reach safe internal temperatures, preventing
              foodborne illnesses.
            </li>
            <li className="list-item">
              <strong>Mixing Bowls & Utensils:</strong> A good set of durable
              bowls and spatulas/spoons for preparing meals in various
              quantities.
            </li>
          </ul>
        </section>

        <section
          className={`flex-1 p-6 sm:p-8 bg-opacity-80 backdrop-blur-sm rounded-lg shadow-xl border transition-all duration-300
                      ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 hover:border-indigo-500"
                          : "bg-gray-100 border-gray-300 hover:border-indigo-600"
                      }`}
          data-aos="fade-left"
          data-aos-delay="400"
        >
          <h3
            className={`text-3xl sm:text-3xl font-bold mb-4 border-b-2 pb-3 
                        ${
                          theme === "dark"
                            ? "text-indigo-400 border-indigo-600"
                            : "text-indigo-600 border-indigo-600"
                        }`}
          >
            Storage & Transportation Gear
          </h3>
          <ul
            className={`list-disc pl-6 space-y-3 text-base sm:text-lg 
                        ${
                          theme === "dark" ? "text-gray-200" : "text-gray-700"
                        }`}
          >
            <li className="list-item">
              <strong>Airtight Containers:</strong> Indispensable for keeping
              food fresh, preventing spills, and organizing surplus in fridges
              or pantries. Glass or BPA-free plastic is recommended.
            </li>
            <li className="list-item">
              <strong>Reusable Bags & Coolers:</strong> For safely transporting
              perishable items, especially in Dhaka's climate, maintaining
              temperature is crucial.
            </li>
            <li className="list-item">
              <strong>Labels & Markers:</strong> Clearly label food items with
              contents and dates to ensure freshness and reduce waste.
            </li>
            <li className="list-item">
              <strong>Sanitizing Wipes/Spray:</strong> For quick clean-ups of
              surfaces and containers before and after handling food, promoting
              hygiene.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default FoodHandlingEssentials;
