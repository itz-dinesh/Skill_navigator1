import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request with email and password in the request body
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password
      });

      if (response.status === 200) {
        localStorage.setItem('authToken', response.data.token);
        navigate("/profile");
      }
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.error : "An error occurred. Please check your network connection.");
    }
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  const inputVariant = {
    hover: {
      scale: 1.05,
      borderColor: "#3b82f6",
      boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.5)",
      transition: { duration: 0.3 },
    },
    focus: {
      scale: 1.1,
      borderColor: "#2563eb",
      boxShadow: "0px 0px 12px rgba(37, 99, 235, 0.8)",
      transition: { duration: 0.3 },
    },
  };

  const buttonVariant = {
    hover: {
      scale: 1.05,
      backgroundColor: "#2563eb",
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      backgroundColor: "#1d4ed8",
      transition: { duration: 0.1 },
    },
  };

  const placeholderVariant = {
    initial: { opacity: 1, y: 0, scale: 1 },
    hover: { opacity: 0.8, y: -5, scale: 0.95, transition: { duration: 0.3 } },
    focus: { opacity: 0.7, y: -10, scale: 0.9, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex items-center justify-center min-h-screen bg-white overflow-x-hidden overflow-y-hidden pt-9"
    >
      <motion.div
        className="flex flex-col md:flex-row bg-white overflow-x-hidden overflow-y-hidden w-fit h-fit mt-1"
        initial="hidden"
        animate="visible"
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <motion.div
          className="hidden md:flex md:w-1/2 bg-white"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <img
            src="src/assets/login_img.png"
            alt="Illustration"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center h-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h2 className="text-4xl font-semibold text-gray-800">
            Login to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 hover:underline"
              onClick={handleSignUpClick}
            >
              Sign up
            </a>
          </p>

          {error && (
            <div className="bg-red-200 text-red-700 p-3 rounded-lg mt-4">
              {error}
            </div>
          )}

          <form className="mt-6 flex flex-col" onSubmit={handleSubmit}>
            <motion.div
              className="relative mt-4"
              initial="initial"
              whileHover="hover"
              whileFocus="focus"
            >
              <motion.input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-white placeholder-transparent text-black focus:outline-none"
                variants={inputVariant}
              />
              {email.length === 0 && (
                <motion.label
                  htmlFor="email"
                  className="absolute left-4 top-2 text-gray-400 pointer-events-none"
                  variants={placeholderVariant}
                >
                  E-mail
                </motion.label>
              )}
            </motion.div>

            <motion.div
              className="relative mt-4"
              initial="initial"
              whileHover="hover"
              whileFocus="focus"
            >
              <motion.input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-white placeholder-transparent text-black focus:outline-none"
                variants={inputVariant}
              />
              {password.length === 0 && (
                <motion.label
                  htmlFor="password"
                  className="absolute left-4 top-2 text-gray-400 pointer-events-none"
                  variants={placeholderVariant}
                >
                  Password
                </motion.label>
              )}
            </motion.div>

            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                Terms & Conditions Apply
              </label>
            </div>
            <motion.button
              type="submit"
              className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg"
              variants={buttonVariant}
              whileHover="hover"
              whileTap="tap"
            >
              Login
            </motion.button>
          </form>
          <div className="flex items-center justify-center mt-6">
            <span className="border-t border-gray-300 w-1/4"></span>
            <span className="text-gray-500 mx-4">or</span>
            <span className="border-t border-gray-300 w-1/4"></span>
          </div>
          <motion.button
            className="w-full mt-6 bg-gray-100 text-gray-800 py-2 rounded-lg border border-gray-300 flex items-center justify-center"
            variants={buttonVariant}
            whileHover="hover"
            whileTap="tap"
          >
            <img
              src="src/assets/google.png"
              alt="Google Icon"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;