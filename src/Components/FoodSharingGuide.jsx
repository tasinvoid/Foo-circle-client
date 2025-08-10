import React, { useContext, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ThemeContext } from "../contexts/ThemeContext";

const FoodSharingGuide = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div
      className={`rounded-xl p-8 max-w-[1500px] mx-auto my-12 border
      ${
        theme === "dark"
          ? "text-gray-100 shadow-2xl shadow-indigo-500/20 border-gray-700 bg-gray-900"
          : "text-gray-800 shadow-2xl shadow-gray-300/40 border-gray-300 bg-gray-100"
      }`}
    >
      <h2
        className={`text-4xl md:text-5xl font-extrabold mb-6 text-center drop-shadow-md
        ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}
        data-aos="fade-up"
        data-aos-duration="800"
      >
        Maximizing Our Shared Bounty
      </h2>
      <p
        className={`text-lg md:text-xl mb-10 leading-relaxed max-w-3xl mx-auto text-center
        ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="800"
      >
        Reducing food waste and sharing surplus strengthens our community and
        ensures that good food nourishes those around us. Discover simple ways
        to contribute to a more sustainable food system right here in Dhaka.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: Smart Sharing Practices */}
        <section
          className={`p-8 bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-xl border
                     hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-2
                     ${
                       theme === "dark"
                         ? "bg-gray-800 border-gray-700"
                         : "bg-white border-gray-300"
                     }`}
          data-aos="fade-down-right"
          data-aos-duration="1000"
        >
          <div className="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-10 w-10 mr-4
              ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <h3
              className={`text-3xl font-bold
              ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}
            >
              Smart Sharing Practices
            </h3>
          </div>
          <ul
            className={`list-disc pl-6 space-y-4 text-lg mt-6
            ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}
          >
            <li className="list-item">
              <strong>Know Your Surplus:</strong> Regularly check your pantry
              and fridge to identify items you will not use before they expire.
            </li>
            <li className="list-item">
              <strong>Share Freshness:</strong> Offer produce at its peak
              quality. Consider ripeness and shelf life when sharing.
            </li>
            <li className="list-item">
              <strong>Package Thoughtfully:</strong> Use clean and appropriate
              packaging to maintain the quality and safety of shared food.
            </li>
            <li className="list-item">
              <strong>Clear Communication:</strong> When listing food, clearly
              state what it is, its quantity, and any important details like
              preparation instructions or potential allergens.
            </li>
          </ul>
        </section>

        {/* Card 2: Effective Surplus Reduction Tips */}
        <section
          className={`p-8 bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-xl border
                     hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-2
                     ${
                       theme === "dark"
                         ? "bg-gray-800 border-gray-700"
                         : "bg-white border-gray-300"
                     }`}
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          <div className="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-10 w-10 mr-4
              ${theme === "dark" ? "text-pink-400" : "text-pink-600"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 7h.01M7 3h.01M17 17h.01M17 21h.01M4.772 19.336A9 9 0 013 12a9 9 0 0118 0 9 9 0 01-1.772 7.336M12 21a9 9 0 01-9-9"
              />
            </svg>
            <h3
              className={`text-3xl font-bold
              ${theme === "dark" ? "text-pink-400" : "text-pink-600"}`}
            >
              Effective Surplus Reduction Tips
            </h3>
          </div>
          <div
            className={`space-y-6 text-lg mt-6
            ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}
          >
            <div>
              <h4
                className={`text-3xl font-semibold mb-2
                ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
              >
                1. Plan Your Meals Wisely
              </h4>
              <p>
                Creating a weekly meal plan and sticking to your shopping list
                helps prevent overbuying and reduces the likelihood of food
                spoilage.
              </p>
            </div>
            <div>
              <h4
                className={`text-3xl font-semibold mb-2
                ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
              >
                2. Store Food Correctly
              </h4>
              <p>
                Understanding the best storage methods for different types of
                food can significantly extend their shelf life and prevent
                premature spoilage.
              </p>
            </div>
            <div>
              <h4
                className={`text-3xl font-semibold mb-2
                ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
              >
                3. Get Creative with Leftovers
              </h4>
              <p>
                Transforming leftover ingredients into new and exciting meals is
                a fantastic way to reduce waste and discover new culinary
                possibilities.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FoodSharingGuide;
