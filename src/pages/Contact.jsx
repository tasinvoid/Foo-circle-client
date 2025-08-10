import React, { useContext } from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaLinkedinIn,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { ThemeContext } from "../contexts/ThemeContext";

const Contact = () => {
  const { theme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const mailData = Object.fromEntries(formData.entries());
    
    // Determine Swal background color based on theme
    const swalBackground = theme === 'dark' ? "#191E24" : "#F9FAFB";
    const swalTextColor = theme === 'dark' ? "#F3F4F6" : "#1F2937";
    
    try {
      const res = await fetch(`https://foo-circle.vercel.app/nodeMailer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mailData),
      });
      const data = await res.json();
      console.log(data);
      Swal.fire({
        background: swalBackground,
        color: swalTextColor,
        title: "Successfully Sent!",
        text: `Mail sent to shoaibmahmudtasin@gmail.com with MessageID: ${data.messageId}`,
        icon: "success",
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      Swal.fire({
        background: swalBackground,
        color: swalTextColor,
        title: "Error",
        text: "Failed to send message. Please try again later.",
        icon: "error",
      });
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500
      ${
        theme === 'dark'
          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-800"
      }`}>
      <div className={`max-w-4xl w-full mx-auto p-8 rounded-2xl shadow-2xl transition-colors duration-500
        ${
          theme === 'dark'
            ? "bg-gray-900 border border-gray-700"
            : "bg-white border border-gray-300"
        }`}>
        <div className="text-center mb-10">
          <h2 className={`text-4xl font-extrabold mb-2 transition-colors duration-500
            ${theme === 'dark' ? "text-indigo-400" : "text-indigo-600"}`}>
            Get in Touch
          </h2>
          <p className={`text-lg transition-colors duration-500
            ${theme === 'dark' ? "text-gray-400" : "text-gray-600"}`}>
            We'd love to hear from you! Send us a message and we'll get back to
            you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className={`p-6 rounded-lg shadow-lg border transition-colors duration-500
            ${
              theme === 'dark'
                ? "bg-gray-800 border-gray-700"
                : "bg-gray-100 border-gray-300"
            }`}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className={`block font-semibold mb-2 transition-colors duration-500
                    ${theme === 'dark' ? "text-gray-300" : "text-gray-700"}`}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-500
                    ${
                      theme === 'dark'
                        ? "bg-gray-700 text-gray-100 border-gray-600 focus:ring-indigo-500"
                        : "bg-white text-gray-800 border-gray-300 focus:ring-indigo-600"
                    }`}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className={`block font-semibold mb-2 transition-colors duration-500
                    ${theme === 'dark' ? "text-gray-300" : "text-gray-700"}`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-500
                    ${
                      theme === 'dark'
                        ? "bg-gray-700 text-gray-100 border-gray-600 focus:ring-indigo-500"
                        : "bg-white text-gray-800 border-gray-300 focus:ring-indigo-600"
                    }`}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className={`block font-semibold mb-2 transition-colors duration-500
                    ${theme === 'dark' ? "text-gray-300" : "text-gray-700"}`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-500
                    ${
                      theme === 'dark'
                        ? "bg-gray-700 text-gray-100 border-gray-600 focus:ring-indigo-500"
                        : "bg-white text-gray-800 border-gray-300 focus:ring-indigo-600"
                    }`}
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className={`w-full px-4 py-3 rounded-lg font-bold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${
                    theme === 'dark'
                      ? "bg-indigo-600 text-gray-100 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-gray-900"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-600 focus:ring-offset-gray-100"
                  }`}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info and Socials */}
          <div className={`p-6 rounded-lg shadow-lg border space-y-6 transition-colors duration-500
            ${
              theme === 'dark'
                ? "bg-gray-800 border-gray-700"
                : "bg-gray-100 border-gray-300"
            }`}>
            <h3 className={`text-3xl font-bold border-b pb-3 mb-4 transition-colors duration-500
              ${
                theme === 'dark'
                  ? "text-indigo-400 border-gray-700"
                  : "text-indigo-600 border-gray-300"
              }`}>
              Our Information
            </h3>
            <div className="flex items-start space-x-4">
              <FaMapMarkerAlt className={`text-xl flex-shrink-0 mt-1 transition-colors duration-500
                ${theme === 'dark' ? "text-indigo-400" : "text-indigo-600"}`} />
              <div className="flex flex-col">
                <p className={`font-semibold transition-colors duration-500
                  ${theme === 'dark' ? "text-gray-300" : "text-gray-700"}`}>
                  Address
                </p>
                <p className={`transition-colors duration-500
                  ${theme === 'dark' ? "text-gray-400" : "text-gray-600"}`}>
                  123 FoodShare Avenue, Dhaka, Bangladesh
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaEnvelope className={`text-xl flex-shrink-0 mt-1 transition-colors duration-500
                ${theme === 'dark' ? "text-indigo-400" : "text-indigo-600"}`} />
              <div className="flex flex-col">
                <p className={`font-semibold transition-colors duration-500
                  ${theme === 'dark' ? "text-gray-300" : "text-gray-700"}`}>
                  Email
                </p>
                <p className={`transition-colors duration-500
                  ${theme === 'dark' ? "text-gray-400" : "text-gray-600"}`}>
                  support@foodshare.com
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaPhone className={`text-xl flex-shrink-0 mt-1 transition-colors duration-500
                ${theme === 'dark' ? "text-indigo-400" : "text-indigo-600"}`} />
              <div className="flex flex-col">
                <p className={`font-semibold transition-colors duration-500
                  ${theme === 'dark' ? "text-gray-300" : "text-gray-700"}`}>
                  Phone
                </p>
                <p className={`transition-colors duration-500
                  ${theme === 'dark' ? "text-gray-400" : "text-gray-600"}`}>
                  +880 133-4080-148
                </p>
              </div>
            </div>

            <div className={`border-t pt-6 transition-colors duration-500
              ${theme === 'dark' ? "border-gray-700" : "border-gray-300"}`}>
              <h4 className="text-lg font-semibold text-gray-200 mb-4">
                Follow Us
              </h4>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61573135861799"
                  className={`transition-colors duration-200
                    ${
                      theme === 'dark'
                        ? "text-gray-400 hover:text-indigo-400"
                        : "text-gray-600 hover:text-indigo-600"
                    }`}
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="www.linkedin.com/in/shoaib-mahmud-tasin"
                  className={`transition-colors duration-200
                    ${
                      theme === 'dark'
                        ? "text-gray-400 hover:text-indigo-400"
                        : "text-gray-600 hover:text-indigo-600"
                    }`}
                >
                  <FaLinkedinIn size={24} />
                </a>
                <a
                  href="https://github.com/tasinvoid"
                  className={`transition-colors duration-200
                    ${
                      theme === 'dark'
                        ? "text-gray-400 hover:text-indigo-400"
                        : "text-gray-600 hover:text-indigo-600"
                    }`}
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="#"
                  className={`transition-colors duration-200
                    ${
                      theme === 'dark'
                        ? "text-gray-400 hover:text-indigo-400"
                        : "text-gray-600 hover:text-indigo-600"
                    }`}
                >
                  <FaWhatsapp size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;