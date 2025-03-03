import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../lib/appwrite";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn, setLoading } = useAuthContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { email, password } = formData;
      const response = await signIn(email, password);
      if (response) {
        setUser(response);
        setIsLoggedIn(true);
        navigate("/generate");
      }
      console.log("Signed in:", response);
      alert("Signed in successfully:", response);
    } catch (error) {
      let errorMessage = "An error occurred during login";

      if (error.type === "user_not_found") {
        errorMessage = "User not found";
      } else if (error.type === "wrong_password") {
        errorMessage = "Incorrect password";
      } else if (error.type === "invalid_email") {
        errorMessage = "Invalid email format";
      }

      console.error(errorMessage);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center pt-12 px-6">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-primary rounded-lg p-8 shadow-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-primary font-bold text-white">
              Welcome Back
            </h1>
            <p className="text-gray-400 font-secondary mt-2">
              Sign in to continue building your portfolio
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-secondary font-medium text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-[#1f2937] border border-[#3B3363] rounded-lg px-4 py-3 text-white font-secondary focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                placeholder="youremail@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-secondary font-medium text-gray-300"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm font-secondary text-[#8B5CF6] hover:text-[#7C3AED]"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full bg-[#1f2937] border border-[#3B3363] rounded-lg px-4 py-3 text-white font-secondary focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={formData.remember}
                onChange={(e) =>
                  setFormData({ ...formData, remember: e.target.checked })
                }
                className="h-4 w-4 rounded border-[#3B3363] bg-[#2A2A2A] text-[#8B5CF6] focus:ring-[#8B5CF6] focus:ring-offset-[#1E1E1E]"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm font-secondary text-gray-300"
              >
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#8B5CF6] text-white font-secondary font-medium py-3 px-4 rounded-lg hover:bg-[#7C3AED] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2 focus:ring-offset-[#1E1E1E]"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-[#3B3363]"></div>
            <span className="flex-shrink mx-4 text-gray-400 font-secondary text-sm">
              Or continue with
            </span>
            <div className="flex-grow border-t border-[#3B3363]"></div>
          </div>

          {/* Social Login Options */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center bg-[#1f2937] text-white font-secondary font-medium py-3 px-4 rounded-lg hover:bg-[#314157] transition-colors">
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.58V20.29H19.28C21.36 18.34 22.56 15.56 22.56 12.25Z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23C14.97 23 17.46 22 19.28 20.29L15.71 17.58C14.73 18.22 13.48 18.58 12 18.58C9.12 18.58 6.69 16.67 5.79 14.09H2.11V16.87C3.93 20.44 7.69 23 12 23Z"
                  fill="#34A853"
                />
                <path
                  d="M5.79 14.09C5.57 13.43 5.45 12.73 5.45 12C5.45 11.27 5.57 10.57 5.79 9.91V7.13H2.11C1.4 8.59 1 10.26 1 12C1 13.74 1.4 15.41 2.11 16.87L5.79 14.09Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.42C13.62 5.42 15.06 5.96 16.21 7.05L19.36 3.91C17.45 2.1 14.97 1 12 1C7.69 1 3.93 3.56 2.11 7.13L5.79 9.91C6.69 7.33 9.12 5.42 12 5.42Z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center bg-[#1f2937] text-white font-secondary font-medium py-3 px-4 rounded-lg hover:bg-[#314157] transition-colors">
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.521 21.279 9.521 21.016C9.521 20.78 9.513 20.101 9.508 19.258C6.726 19.858 6.139 17.92 6.139 17.92C5.684 16.759 5.029 16.457 5.029 16.457C4.121 15.814 5.098 15.827 5.098 15.827C6.102 15.899 6.629 16.875 6.629 16.875C7.521 18.413 8.97 17.968 9.539 17.717C9.631 17.09 9.889 16.647 10.175 16.419C7.955 16.187 5.62 15.375 5.62 11.611C5.62 10.519 6.01 9.63 6.649 8.937C6.546 8.687 6.203 7.759 6.747 6.324C6.747 6.324 7.587 6.058 9.497 7.411C10.292 7.191 11.15 7.082 12 7.077C12.85 7.082 13.707 7.191 14.505 7.411C16.413 6.058 17.251 6.324 17.251 6.324C17.797 7.759 17.453 8.687 17.351 8.937C17.991 9.63 18.379 10.519 18.379 11.611C18.379 15.385 16.04 16.183 13.813 16.411C14.172 16.693 14.496 17.254 14.496 18.104C14.496 19.31 14.483 20.687 14.483 21.016C14.483 21.282 14.663 21.587 15.174 21.486C19.137 20.16 22 16.415 22 12C22 6.477 17.523 2 12 2Z"
                  fill="white"
                />
              </svg>
              GitHub
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <p className="text-gray-400 font-secondary">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#8B5CF6] hover:text-[#7C3AED] font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
