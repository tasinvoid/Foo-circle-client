import React, { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";

const EditMyFood = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const foodToEdit = useLoaderData();
  const navigate = useNavigate();

  const {
    _id,
    Email,
    Name,
    foodName,
    availability,
    expiredDate,
    additionalNotes,
    pickupLocation,
    photoURL,
    foodQuantity,
  } = foodToEdit[0];

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedFoodData = Object.fromEntries(formData.entries());

    fetch(`https://foo-circle.vercel.app/editMyFood/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFoodData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            background: theme === "dark" ? "#1F2937" : "#F3F4F6",
            color: theme === "dark" ? "#F3F4F6" : "#1F2937",
            title: "Success!",
            text: "Food item updated successfully.",
            icon: "success",
            confirmButtonColor: "#4F46E5",
          }).then(() => {
            navigate("/manageMyFoods");
          });
        } else {
          Swal.fire({
            background: theme === "dark" ? "#1F2937" : "#F3F4F6",
            color: theme === "dark" ? "#F3F4F6" : "#1F2937",
            title: "No Changes",
            text: "No changes were made to the food item.",
            icon: "info",
            confirmButtonColor: "#4F46E5",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          background: theme === "dark" ? "#1F2937" : "#F3F4F6",
          color: theme === "dark" ? "#F3F4F6" : "#1F2937",
          title: "Error!",
          text: "An error occurred while updating.",
          icon: "error",
          confirmButtonColor: "#4F46E5",
        });
        console.error("Error updating food item:", error);
      });
  };

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-500
      ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-800"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto p-8 rounded-xl bg-opacity-80 backdrop-blur-sm border shadow-2xl
        ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-300"
        }`}
      >
        <h1
          className={`text-3xl font-bold text-center mb-8
          ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}
        >
          Edit Food Item
        </h1>
        <form onSubmit={handleOnSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="form-control w-full">
              <div className="label">
                <span
                  className={`label-text font-semibold
                  ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                >
                  Food Name
                </span>
              </div>
              <input
                type="text"
                name="foodName"
                defaultValue={foodName}
                className={`input input-bordered w-full focus:outline-none
                ${
                  theme === "dark"
                    ? "bg-gray-900 text-gray-100 border-gray-700 focus:border-indigo-500"
                    : "bg-gray-100 text-gray-800 border-gray-300 focus:border-indigo-600"
                }`}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span
                  className={`label-text font-semibold
                  ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                >
                  Food Quantity
                </span>
              </div>
              <input
                type="number"
                name="foodQuantity"
                defaultValue={foodQuantity}
                className={`input input-bordered w-full focus:outline-none
                ${
                  theme === "dark"
                    ? "bg-gray-900 text-gray-100 border-gray-700 focus:border-indigo-500"
                    : "bg-gray-100 text-gray-800 border-gray-300 focus:border-indigo-600"
                }`}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span
                  className={`label-text font-semibold
                  ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                >
                  Expired Date
                </span>
              </div>
              <input
                type="date"
                name="expiredDate"
                defaultValue={expiredDate}
                className={`input input-bordered w-full focus:outline-none
                ${
                  theme === "dark"
                    ? "bg-gray-900 text-gray-100 border-gray-700 focus:border-indigo-500"
                    : "bg-gray-100 text-gray-800 border-gray-300 focus:border-indigo-600"
                }`}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span
                  className={`label-text font-semibold
                  ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                >
                  Pickup Location
                </span>
              </div>
              <input
                type="text"
                name="pickupLocation"
                defaultValue={pickupLocation}
                className={`input input-bordered w-full focus:outline-none
                ${
                  theme === "dark"
                    ? "bg-gray-900 text-gray-100 border-gray-700 focus:border-indigo-500"
                    : "bg-gray-100 text-gray-800 border-gray-300 focus:border-indigo-600"
                }`}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span
                  className={`label-text font-semibold
                  ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                >
                  Availability
                </span>
              </div>
              <select
                name="availability"
                defaultValue={availability}
                className={`select select-bordered w-full focus:outline-none
                ${
                  theme === "dark"
                    ? "bg-gray-900 text-gray-100 border-gray-700 focus:border-indigo-500"
                    : "bg-gray-100 text-gray-800 border-gray-300 focus:border-indigo-600"
                }`}
              >
                <option
                  className={`${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
                  value="available"
                >
                  Available
                </option>
                <option
                  className={`${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
                  value="notAvailable"
                >
                  Not Available
                </option>
              </select>
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span
                  className={`label-text font-semibold
                  ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                >
                  Sharer's Email
                </span>
              </div>
              <input
                type="text"
                name="Email"
                defaultValue={user.email}
                readOnly
                className={`input input-bordered w-full cursor-not-allowed
                ${
                  theme === "dark"
                    ? "bg-gray-900 text-gray-400 border-gray-700"
                    : "bg-gray-100 text-gray-500 border-gray-300"
                }`}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span
                  className={`label-text font-semibold
                  ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                >
                  Sharer's Name
                </span>
              </div>
              <input
                type="text"
                name="Name"
                defaultValue={user.displayName}
                readOnly
                className={`input input-bordered w-full cursor-not-allowed
                ${
                  theme === "dark"
                    ? "bg-gray-900 text-gray-400 border-gray-700"
                    : "bg-gray-100 text-gray-500 border-gray-300"
                }`}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span
                  className={`label-text font-semibold
                  ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                >
                  Food Photo URL
                </span>
              </div>
              <input
                type="text"
                name="photoURL"
                defaultValue={photoURL}
                className={`input input-bordered w-full focus:outline-none
                ${
                  theme === "dark"
                    ? "bg-gray-900 text-gray-100 border-gray-700 focus:border-indigo-500"
                    : "bg-gray-100 text-gray-800 border-gray-300 focus:border-indigo-600"
                }`}
              />
            </label>
          </div>

          <label className="form-control w-full">
            <div className="label">
              <span
                className={`label-text font-semibold
                ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
              >
                Additional Notes
              </span>
            </div>
            <textarea
              name="additionalNotes"
              defaultValue={additionalNotes}
              className={`textarea textarea-bordered h-20 w-full focus:outline-none
              ${
                theme === "dark"
                  ? "bg-gray-900 text-gray-100 border-gray-700 focus:border-indigo-500"
                  : "bg-gray-100 text-gray-800 border-gray-300 focus:border-indigo-600"
              }`}
            />
          </label>

          <button
            type="submit"
            className={`btn w-full text-lg font-bold text-gray-100 rounded-lg border-none transition-colors duration-200 mt-4
            ${
              theme === "dark"
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            Update Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMyFood;
