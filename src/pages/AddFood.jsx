import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useNavigate } from "react-router";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate()

  if (!user) {
    return <div>Loading user...</div>;
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const foodData = Object.fromEntries(formData.entries());
    foodData.photoURL = foodData.photoURL || user.photoURL;

    // send data to backend
    fetch("http://localhost:3000/addFood", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            background: theme === "dark" ? "#1F2937" : "#F3F4F6",
            color: theme === "dark" ? "#F3F4F6" : "#1F2937",
            title: "Successfully added",
            text: "Successfully added data in DB",
            icon: "success",
            confirmButtonColor: "#4F46E5",
          });
          form.reset();
          navigate('/')

        }
      });
  }

  return (
    <div
      className={`min-h-screen lg:p-24 pt-5 transition-colors duration-500
      ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-300"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-800"
      }`}
    >
      <div className="p-12 text-center pt-0">
        <h1
          className={`text-3xl font-extrabold pb-5 ${
            theme === "dark" ? "text-indigo-400" : "text-indigo-600"
          }`}
        >
          Add a Food
        </h1>
        <p
          className={`${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Every contribution, no matter how small, makes a significant
          difference in our community. If you have surplus food – whether it's
          an extra harvest from your garden, unused pantry staples, or delicious
          leftovers that won't go to waste – we encourage you to share it here.
        </p>
      </div>
      <form
        onSubmit={handleOnSubmit}
        className={`font-extrabold mb-6 text-center text-xl ${
          theme === "dark" ? "text-gray-100" : "text-gray-800"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <fieldset
            className={`bg-opacity-80 backdrop-blur-sm border rounded-box p-4 shadow-md
            ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-300"
            }`}
          >
            <label
              className={`label w-full ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Food Name
            </label>
            <input
              type="text"
              className={`input w-full bg-opacity-70 border rounded-md focus:outline-none 
              ${
                theme === "dark"
                  ? "bg-gray-950 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-indigo-500"
                  : "bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-indigo-600"
              }`}
              placeholder="Food Name"
              name="foodName"
            />
          </fieldset>
          <fieldset
            className={`bg-opacity-80 backdrop-blur-sm border rounded-box p-4 shadow-md
            ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-300"
            }`}
          >
            <label
              className={`label w-full ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Email
            </label>
            <input
              type="text"
              className={`input w-full bg-opacity-70 border rounded-md cursor-not-allowed
              ${
                theme === "dark"
                  ? "bg-gray-950 border-gray-700 text-gray-400"
                  : "bg-gray-100 border-gray-300 text-gray-500"
              }`}
              name="Email"
              value={user.email}
              readOnly
            />
          </fieldset>
          <fieldset
            className={`bg-opacity-80 backdrop-blur-sm border rounded-box p-4 shadow-md
            ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-300"
            }`}
          >
            <label
              className={`label w-full ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Name
            </label>
            <input
              type="text"
              className={`input w-full bg-opacity-70 border rounded-md cursor-not-allowed
              ${
                theme === "dark"
                  ? "bg-gray-950 border-gray-700 text-gray-400"
                  : "bg-gray-100 border-gray-300 text-gray-500"
              }`}
              name="Name"
              value={user.displayName}
              readOnly
            />
          </fieldset>
          <fieldset
            className={`bg-opacity-80 backdrop-blur-sm border rounded-box p-4 shadow-md
            ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-300"
            }`}
          >
            <label
              className={`label w-full ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Food Quantity
            </label>
            <input
              type="number"
              className={`input w-full bg-opacity-70 border rounded-md focus:outline-none 
              ${
                theme === "dark"
                  ? "bg-gray-950 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-indigo-500"
                  : "bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-indigo-600"
              }`}
              placeholder="Food Quantity"
              name="foodQuantity"
            />
          </fieldset>
          <fieldset
            className={`bg-opacity-80 backdrop-blur-sm border rounded-box p-4 shadow-md
            ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-300"
            }`}
          >
            <label
              className={`label w-full ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Expired Date/Time
            </label>
            <input
              type="date"
              className={`input w-full bg-opacity-70 border rounded-md focus:outline-none 
              ${
                theme === "dark"
                  ? "bg-gray-950 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-indigo-500"
                  : "bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-indigo-600"
              }`}
              name="expiredDate"
            ></input>
          </fieldset>
          <fieldset
            className={`bg-opacity-80 backdrop-blur-sm border rounded-box p-4 shadow-md
            ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-300"
            }`}
          >
            <label
              className={`label w-full ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Pickup Location
            </label>
            <input
              type="text"
              className={`input w-full bg-opacity-70 border rounded-md focus:outline-none 
              ${
                theme === "dark"
                  ? "bg-gray-950 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-indigo-500"
                  : "bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-indigo-600"
              }`}
              placeholder="Pickup Location"
              name="pickupLocation"
            />
          </fieldset>
          <fieldset
            className={`bg-opacity-80 backdrop-blur-sm border rounded-box p-4 shadow-md
            ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-300"
            }`}
          >
            <label
              className={`label w-full ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Food Photo URL
            </label>
            <input
              type="text"
              className={`input w-full bg-opacity-70 border rounded-md focus:outline-none 
              ${
                theme === "dark"
                  ? "bg-gray-950 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-indigo-500"
                  : "bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-indigo-600"
              }`}
              placeholder="Photo URL"
              name="photoURL"
            />
          </fieldset>
          <fieldset
            className={`bg-opacity-80 backdrop-blur-sm border rounded-box p-4 shadow-md
            ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-300"
            }`}
          >
            <label
              className={`label w-full ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Availability
            </label>
            <select
              name="availability"
              className={`input w-full bg-opacity-70 border rounded-md focus:outline-none 
              ${
                theme === "dark"
                  ? "bg-gray-950 border-gray-700 text-gray-100 focus:border-indigo-500"
                  : "bg-gray-100 border-gray-300 text-gray-800 focus:border-indigo-600"
              }`}
              defaultValue={"available"}
            >
              <option
                className={`${
                  theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-white text-gray-800"
                }`}
                value=""
              >
                -- select Availability --
              </option>
              <option
                className={`${
                  theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-white text-gray-800"
                }`}
                value="available"
              >
                Available
              </option>
              <option
                className={`${
                  theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-white text-gray-800"
                }`}
                value="notAvailable"
              >
                Not Available
              </option>
            </select>
          </fieldset>
        </div>
        <fieldset
          className={`bg-opacity-80 backdrop-blur-sm border rounded-box p-4 my-6 shadow-md
          ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-300"
          }`}
        >
          <label
            className={`label w-full ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Additional Notes
          </label>
          <input
            type="text"
            placeholder="Type here"
            className={`input w-full bg-opacity-70 border rounded-md focus:outline-none 
            ${
              theme === "dark"
                ? "bg-gray-950 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-indigo-500"
                : "bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-indigo-600"
            }`}
            name="additionalNotes"
            defaultValue={"Enter notes"}
          />
        </fieldset>
        <button
          type="submit"
          className={`btn w-full text-xl font-extrabold text-gray-100 rounded-xl transition-colors duration-200
          ${
            theme === "dark"
              ? "bg-indigo-600 hover:bg-indigo-700 border-none"
              : "bg-indigo-600 hover:bg-indigo-700 text-white border-none"
          }`}
        >
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFood;