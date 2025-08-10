import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import NoDataFound from "../Components/NoDataFound";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const queryClient = useQueryClient();

  const {
    data: myFoods,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myFoods", user?.email],
    queryFn: async () => {
      if (!user) return [];
      const res = await fetch(
        `https://foo-circle.vercel.app/manageMyFoods?Email=${user.email}`
      );
      return res.json();
    },
    enabled: !!user,
  });

  const deleteFoodMutation = useMutation({
    mutationFn: (id) => {
      return fetch(`https://foo-circle.vercel.app/manageMyFoods/${id}`, {
        method: "DELETE",
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myFoods", user?.email] });
      Swal.fire({
        title: "Deleted!",
        text: "Your food item has been deleted.",
        icon: "success",
        background: theme === "dark" ? "#1F2937" : "#F3F4F6",
        color: theme === "dark" ? "#F3F4F6" : "#1F2937",
        confirmButtonColor: "#4F46E5",
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: `Failed to delete item: ${error.message}`,
        icon: "error",
        background: theme === "dark" ? "#1F2937" : "#F3F4F6",
        color: theme === "dark" ? "#F3F4F6" : "#1F2937",
        confirmButtonColor: "#4F46E5",
      });
    },
  });

  const handleDeleteBtn = (id) => {
    Swal.fire({
      background: theme === "dark" ? "#1F2937" : "#F3F4F6",
      color: theme === "dark" ? "#F3F4F6" : "#1F2937",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: theme === "dark" ? "#EC4899" : "#F472B6",
      cancelButtonColor: "#4F46E5",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFoodMutation.mutate(id);
      }
    });
  };

  if (isLoading) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen transition-colors duration-500
          ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950"
              : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200"
          }`}
      >
        <span
          className={`loading loading-spinner w-20 h-20
            ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}
        ></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen transition-colors duration-500
          ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100"
              : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-800"
          }`}
      >
        <p>Error loading data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-500
        ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100"
            : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-800"
        }`}
    >
      <h1
        className={`text-3xl lg:text-4xl font-bold text-center mb-8
          ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}
      >
        Manage Your Foods
      </h1>
      <div className="container mx-auto">
        {myFoods?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myFoods.map((food) => (
              <div
                key={food._id}
                className={`bg-opacity-80 backdrop-blur-sm rounded-xl p-6 shadow-xl border transition-all duration-300 transform hover:scale-105
                  ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700 hover:border-indigo-500"
                      : "bg-white border-gray-300 hover:border-indigo-600"
                  }`}
              >
                <h2
                  className={`text-3xl font-bold mb-2 truncate
                    ${
                      theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                    }`}
                >
                  {food.foodName}
                </h2>
                <div
                  className={`text-sm mb-4
                    ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                >
                  <p className="mb-1">
                    <strong
                      className={`${
                        theme === "dark" ? "text-pink-400" : "text-pink-600"
                      }`}
                    >
                      Quantity:
                    </strong>{" "}
                    {food.foodQuantity}
                  </p>
                  <p className="mb-1">
                    <strong
                      className={`${
                        theme === "dark" ? "text-pink-400" : "text-pink-600"
                      }`}
                    >
                      Expiry Date:
                    </strong>{" "}
                    {food.expiredDate}
                  </p>
                  <p className="mb-1">
                    <strong
                      className={`${
                        theme === "dark" ? "text-pink-400" : "text-pink-600"
                      }`}
                    >
                      Availability:
                    </strong>{" "}
                    <span
                      className={`font-semibold ${
                        theme === "dark" ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {food.availability}
                    </span>
                  </p>
                </div>
                <p
                  className={`text-sm mt-2 line-clamp-3
                    ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                >
                  <strong
                    className={`${
                      theme === "dark" ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    Notes:
                  </strong>{" "}
                  {food.additionalNotes}
                </p>
                <div className="mt-6 flex justify-end gap-3">
                  <Link to={`/editFood/${food._id}`}>
                    <button
                      className={`btn btn-sm text-xl border-none transition-transform duration-300 hover:scale-110
                        ${
                          theme === "dark"
                            ? "bg-indigo-600 hover:bg-indigo-700 text-gray-100"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white"
                        }`}
                    >
                      <CiEdit />
                    </button>
                  </Link>
                  <button
                    className={`btn btn-sm text-xl border-none transition-transform duration-300 hover:scale-110
                      ${
                        theme === "dark"
                          ? "bg-pink-500 hover:bg-pink-600 text-gray-100"
                          : "bg-pink-500 hover:bg-pink-600 text-white"
                      }`}
                    onClick={() => handleDeleteBtn(food._id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoDataFound theme={theme} />
        )}
      </div>
    </div>
  );
};

export default ManageMyFoods;
