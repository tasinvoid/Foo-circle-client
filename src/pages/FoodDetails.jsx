import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router";
import Modal from "react-modal";
import { AuthContext } from "../contexts/AuthContext";

// It's a good practice to set the app element for accessibility
Modal.setAppElement("#root");

const FoodDetails = () => {
  const { user } = useContext(AuthContext);
  const availableFoodsData = useLoaderData();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [additionalNotes, setAdditionalNotes] = useState(
    availableFoodsData[0].additionalNotes
  );
  console.log(user.email);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleRequestFood() {
    closeModal();
    fetch(
      `http://localhost:3000/updateAdditionalNotes/${availableFoodsData[0]._id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          message: additionalNotes,
          currentUserEmail: user.email,
          requestTime: new Date().toLocaleString(),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  const customModalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1F2937", // bg-gray-800
      borderRadius: "12px",
      padding: "2.5rem",
      maxWidth: "600px",
      width: "90%",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
      border: "none",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      zIndex: 1000,
    },
  };

  return (
    <div className=" bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
      <div className="flex flex-col lg:flex-row gap-10 justify-center items-center p-6">
        <div className="container mx-auto">
          <div>
            {availableFoodsData.map((food, index) => (
              <div
                key={index}
                className="bg-gray-800 bg-opacity-80 backdrop-blur-sm border border-gray-700 text-gray-100 rounded-box shadow-lg overflow-hidden transition-transform duration-300"
              >
                <div className="flex flex-col md:flex-row items-center p-6 gap-6">
                  <img
                    src={food.photoURL}
                    alt={food.foodName}
                    className="w-48 h-48 object-cover object-center rounded-2xl shadow-md border-2 border-indigo-500"
                  />
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-indigo-400 mb-3">
                      {food.foodName}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300 text-md">
                      <p>
                        <strong className="text-gray-200">Quantity:</strong>{" "}
                        {food.foodQuantity}
                      </p>
                      <p>
                        <strong className="text-gray-200">Expires:</strong>{" "}
                        {food.expiredDate}
                      </p>
                      <p>
                        <strong className="text-gray-200">Location:</strong>{" "}
                        <span className={`font-semibold text-gray-100`}>
                          {food.pickupLocation}
                        </span>
                      </p>
                      <p>
                        <strong className="text-gray-200">Availability:</strong>{" "}
                        <span className="text-indigo-400">
                          {food.availability}
                        </span>
                      </p>
                    </div>
                    <div className="mt-5 p-4 bg-gray-900 rounded-md border border-gray-700">
                      <p className="text-gray-300">
                        <strong className="text-gray-200">
                          Additional Notes:
                        </strong>{" "}
                        {additionalNotes}
                      </p>
                    </div>
                    <div className="mt-4 text-sm text-gray-400">
                      <p>Shared by: <span className="text-indigo-400">{food.Name}</span></p>
                      <p>Donor Contact: <span className="text-pink-400">{food.Email}</span></p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <Link to={`/availableFoods/${food._id}`}>
                    <div>
                      <button
                        onClick={openModal}
                        className="w-full py-3 bg-indigo-600 text-gray-100 font-bold rounded-lg hover:bg-indigo-700 transition duration-300 shadow-lg"
                      >
                        Request Food
                      </button>
                      <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customModalStyles}
                        contentLabel="Food Details"
                      >
                        {/* Close Button */}
                        <button
                          onClick={closeModal}
                          className="absolute top-4 right-4 text-gray-400 hover:text-gray-100 text-3xl font-light transition duration-300"
                          aria-label="Close Modal"
                        >
                          &times;
                        </button>

                        {/* Modal Content */}
                        <div className="flex flex-col items-center text-center mb-4">
                          {food.photoURL && (
                            <img
                              src={food.photoURL}
                              alt={food.foodName}
                              className="w-40 h-40 object-cover rounded-full border-4 border-indigo-500 shadow-md mb-4"
                            />
                          )}
                          <h2 className="text-3xl font-extrabold text-indigo-400 mb-2 drop-shadow-sm">
                            {food.foodName}
                          </h2>
                          <p className="text-sm text-gray-400">
                            ID: {food._id}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-left w-full text-gray-300">
                          <div className="flex flex-col">
                            <span className="font-semibold text-indigo-400">
                              Quantity:
                            </span>
                            <span className="text-gray-200">
                              {food.foodQuantity}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-indigo-400">
                              Availability:
                            </span>
                            <span
                              className={`text-indigo-400 font-medium`}
                            >
                              {food.availability}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-indigo-400">
                              Expires:
                            </span>
                            <span className="text-gray-200">
                              {food.expiredDate || "N/A"}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-indigo-400">
                              Pickup Location:
                            </span>
                            <span className="text-gray-200">
                              {food.pickupLocation}
                            </span>
                          </div>
                          <div className="flex flex-col md:col-span-2">
                            <span className="font-semibold text-indigo-400">
                              Donor Name:
                            </span>
                            <span className="text-gray-200">{food.Name}</span>
                          </div>
                          <div className="flex flex-col md:col-span-2">
                            <span className="font-semibold text-indigo-400">
                              Donor Email:
                            </span>
                            <span className="text-pink-400">{food.Email}</span>
                          </div>
                          <div className="flex flex-col md:col-span-2">
                            <span className="font-semibold text-indigo-400">
                              Your Notes to Donor:
                            </span>
                            <input
                              type="text"
                              className="text-gray-200 mt-1 p-3 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 input"
                              defaultValue={
                                additionalNotes
                                  ? `${additionalNotes}`
                                  : "Enter Notes Here"
                              }
                              onChange={(e) =>
                                setAdditionalNotes(e.target.value)
                              }
                            ></input>
                          </div>
                        </div>

                        {/* Optional: Call to action button */}
                        <button
                          onClick={handleRequestFood}
                          className="mt-6 w-full py-3 bg-indigo-600 text-gray-100 font-bold rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md"
                        >
                          Submit Request
                        </button>
                      </Modal>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;