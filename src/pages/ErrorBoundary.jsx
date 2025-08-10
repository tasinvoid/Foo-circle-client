import React from "react";
import Lottie from "lottie-react";
import errorAnimation from "../assets/error_animation.json";

const ErrorBoundary = ({ message, statusCode }) => {
  return (
    <div style={styles.container}>
      <div style={styles.animationWrapper}>
        <Lottie
          animationData={errorAnimation}
          loop={true}
          autoplay={true}
          style={{ height: 400, width: 400 }}
        />
      </div>
      <h1 style={styles.statusCode}>{statusCode || "Oops!"}</h1>
      <p style={styles.message}>
        {message || "Something went wrong. Please try again later."}
      </p>
      <button style={styles.button} onClick={() => window.location.reload()}>
        Refresh Page
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    textAlign: "center",
    backgroundColor: "#f8f8f8",
    color: "#333",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  animationWrapper: {
    marginBottom: "20px",
  },
  statusCode: {
    fontSize: "3em",
    margin: "0 0 10px 0",
    color: "#e74c3c",
  },
  message: {
    fontSize: "1.2em",
    marginBottom: "30px",
    maxWidth: "600px",
  },
  button: {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1em",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#2980b9",
  },
};

export default ErrorBoundary;