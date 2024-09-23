import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from 'axios'; 
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const SignUp = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        firstName,
        lastName,
        email,
        password,
      });
      console.log(response.data); // Handle success response
      navigate("/login"); // Redirect to login or another page after successful signup
    } catch (err) {
      console.error(err);
      setError("An error occurred during signup. Please try again."); // Set error message
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('http://localhost:5000/api/google-login', {
        token: credentialResponse.credential,
      });
      console.log(response.data); // Handle the response from your backend
      navigate("/sidebarandprofile"); // Redirect user to the SidebarAndProfile page
    } catch (err) {
      console.error(err);
      setError("Google authentication failed. Please try again.");
    }
  };
  
  const handleGoogleError = () => {
    setError("Google authentication failed. Please try again.");
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
    <GoogleOAuthProvider clientId="1049144010345-a0aiaccvdrrci7na7h0nnvlvsjmvepfe.apps.googleusercontent.com">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center min-h-screen bg-white pt-9"
      >
        <div className="absolute top-4 left-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Hexaware_new_logo.svg/768px-Hexaware_new_logo.svg.png?20201230064751"
            alt="Logo"
            className="w-24 h-auto"
          />
        </div>

        <motion.div
          className="flex flex-col md:flex-row bg-white w-fit h-fit mt-1"
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
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Sign Up</h1>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
              <motion.div
                className="mb-4"
                variants={inputVariant}
                whileHover="hover"
                whileFocus="focus"
              >
                <label
                  htmlFor="firstName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  First Name
                </label>
                <motion.input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  variants={placeholderVariant}
                  initial="initial"
                  whileHover="hover"
                  whileFocus="focus"
                />
              </motion.div>

              <motion.div
                className="mb-4"
                variants={inputVariant}
                whileHover="hover"
                whileFocus="focus"
              >
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Last Name
                </label>
                <motion.input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  variants={placeholderVariant}
                  initial="initial"
                  whileHover="hover"
                  whileFocus="focus"
                />
              </motion.div>

              <motion.div
                className="mb-4"
                variants={inputVariant}
                whileHover="hover"
                whileFocus="focus"
              >
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  variants={placeholderVariant}
                  initial="initial"
                  whileHover="hover"
                  whileFocus="focus"
                />
              </motion.div>

              <motion.div
                className="mb-6"
                variants={inputVariant}
                whileHover="hover"
                whileFocus="focus"
              >
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Password
                </label>
                <motion.input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  variants={placeholderVariant}
                  initial="initial"
                  whileHover="hover"
                  whileFocus="focus"
                />
              </motion.div>

              <motion.button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-600"
                variants={buttonVariant}
                whileHover="hover"
                whileTap="tap"
              >
                Sign Up
              </motion.button>
            </form>

            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.5 }}
            >
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </motion.div>

            <motion.div
              className="text-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.5 }}
            >
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Log In
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </GoogleOAuthProvider>
  );
};

export default SignUp;
