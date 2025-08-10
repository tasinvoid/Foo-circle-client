import React from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaLinkedinIn,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";
import Swal from "sweetalert2";

const Contact = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const form = e.target;
    const formData = new FormData(form);
    const mailData = Object.fromEntries(formData.entries());
    await fetch(`http://localhost:3000/nodeMailer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mailData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          background: "#191E24",
          title: "Successfully Send mail to shoaibmahmudtasin@gmail.com",
          text: `MessageID:${data.messageId}`,
          icon: "success",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
      <div className="max-w-4xl w-full mx-auto p-8 rounded-2xl shadow-2xl bg-gray-900 border border-gray-700">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-indigo-400 mb-2">
            Get in Touch
          </h2>
          <p className="text-gray-400 text-lg">
            We'd love to hear from you! Send us a message and we'll get back to
            you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-300 font-semibold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-300 font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-300 font-semibold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 rounded-lg bg-indigo-600 text-gray-100 font-bold hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info and Socials */}
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700 space-y-6">
            <h3 className="text-3xl font-bold text-indigo-400 border-b border-gray-700 pb-3 mb-4">
              Our Information
            </h3>
            <div className="flex items-start space-x-4">
              <FaMapMarkerAlt className="text-indigo-400 text-xl flex-shrink-0 mt-1" />
              <div className="flex flex-col items-center">
                <p className="text-gray-300 font-semibold">Address</p>
                <p className="text-gray-400">
                  123 FoodShare Avenue, Dhaka, Bangladesh
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaEnvelope className="text-indigo-400 text-xl flex-shrink-0 mt-1" />
              <div className="flex flex-col items-center w-full">
                <p className="text-gray-300 font-semibold">Email</p>
                <p className="text-gray-400">support@foodshare.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaPhone className="text-indigo-400 text-xl flex-shrink-0 mt-1" />
              <div className="flex flex-col items-center justify-center w-full">
                <p className="text-gray-300 font-semibold">Phone</p>
                <p className="text-gray-400">+880 133-4080-148</p>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-6">
              <h4 className="text-lg font-semibold text-gray-200 mb-4">
                Follow Us
              </h4>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61573135861799"
                  className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="www.linkedin.com/in/shoaib-mahmud-tasin"
                  className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                >
                  <FaLinkedinIn size={24} />
                </a>
                <a
                  href="https://github.com/tasinvoid"
                  className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
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
