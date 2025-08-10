import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const { signInUser, googleUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState("");
  
  const notifySuccess = () => toast("Successfully Logged In");
  const notifyUnsuccess = () => toast("Couldn't Logged In");

  function handleRegisterBtn(e) {
    e.preventDefault();
    setErrorMsg(null);
    const form = e.target;
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());
    const { email, password } = userData;
    signInUser(email, password)
      .then(() => {
        notifySuccess();
        navigate('/')
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMsg(errorMessage);
        notifyUnsuccess();
      });
  }

  function handleGoogleBtn() {
    googleUser()
      .then((result) => {
        navigate('/')
      })
      .catch((error) => {
        const errorMessage = error.message;
      });
  }

  return (
    <div
      className={`flex justify-center items-center min-h-screen transition-colors duration-500
      ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-100 text-gray-800"
      }`}
    >
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
      <div className="hero-content flex-col lg:flex-col">
        <div className="text-center lg:text-left">
          <h1
            className={`text-5xl font-bold
            ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}
          >
            Log In now!
          </h1>
        </div>
        <div
          className={`card w-full max-w-sm shrink-0 shadow-2xl bg-opacity-80 backdrop-blur-sm border
            ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-300"
            }`}
        >
          <div className="card-body">
            <form onSubmit={handleRegisterBtn}>
              <label className="label">
                <span
                  className={`label-text font-semibold
                  ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                >
                  Email
                </span>
              </label>
              <input
                type="email"
                className={`input input-bordered w-full focus:outline-none
                ${
                  theme === "dark"
                    ? "bg-gray-900 text-gray-200 border-gray-700 focus:border-indigo-500"
                    : "bg-gray-100 text-gray-800 border-gray-300 focus:border-indigo-600"
                }`}
                placeholder="Email"
                name="email"
              />
              <label className="label mt-4">
                <span
                  className={`label-text font-semibold
                  ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                >
                  Password
                </span>
              </label>
              <input
                type="password"
                className={`input input-bordered w-full focus:outline-none
                ${
                  theme === "dark"
                    ? "bg-gray-900 text-gray-200 border-gray-700 focus:border-indigo-500"
                    : "bg-gray-100 text-gray-800 border-gray-100 focus:border-indigo-600"
                }`}
                placeholder="Password"
                name="password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                title="Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one special character."
              />

              <div
                className={`mt-5
                ${theme === "dark" ? "text-pink-400" : "text-pink-500"}`}
              >
                {errorMsg}
              </div>
              <div className="flex flex-col gap-5 mt-4">
                <button
                  className={`btn w-full border-none
                  ${
                    theme === "dark"
                      ? "bg-indigo-600 text-gray-100 hover:bg-indigo-700"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  Log In
                </button>
                <Link to={"/register"}>
                  <button
                    className={`btn w-full border-none
                    ${
                      theme === "dark"
                        ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-400"
                    }`}
                  >
                    Register
                  </button>
                </Link>

                {/* Google */}
                <button
                  onClick={handleGoogleBtn}
                  className={`btn border-none
                  ${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-800 border-gray-400 hover:bg-gray-400"
                  }`}
                >
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill={theme === "dark" ? "#fff" : "#fff"}></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Login with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;