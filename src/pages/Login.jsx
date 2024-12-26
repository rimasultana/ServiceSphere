import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";

const Login = () => {
  const { logInWithGoogle, logInUser, isDarkMode } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  useTitle("Login");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and Password are required");
      toast.error("Email and Password are required");
      return;
    }
    setError("");
    logInUser(email, password)
      .then(() => {
        toast.success("User logged in!");
        navigate(from);
      })
      .catch((err) => {
        console.error("Login failed:", err);
        toast.error(err?.message || "Login failed");
      });
  };

  const onGoogleSignIn = () => {
    logInWithGoogle()
      .then(() => {
        toast.success("User signed in with Google!");
        navigate(from);
      })
      .catch((err) => {
        console.error("Google Sign-in failed:", err);
        setError("Google Sign-in failed");
        toast.error("Google Sign-in failed");
      });
  };

  // Dynamic theme classes
  const containerClass = isDarkMode
    ? "bg-gray-900 text-gray-200"
    : "bg-gray-100 text-gray-700";
  const cardClass = isDarkMode
    ? "bg-gray-800 text-gray-200"
    : "bg-white text-gray-700";
  const inputClass = isDarkMode
    ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring focus:ring-indigo-500"
    : "bg-white border-gray-300 text-gray-700 placeholder-gray-500 focus:ring focus:ring-indigo-300";

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${containerClass}`}
    >
      <div className={`shadow-lg rounded-lg p-6 w-full max-w-md ${cardClass}`}>
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 w-full border rounded-lg p-2 ${inputClass}`}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 w-full border rounded-lg p-2 ${inputClass}`}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
          >
            Login
          </button>
        </form>

        <div className="flex items-center justify-between mt-6">
          <span className="block w-full h-px bg-gray-300"></span>
          <span className="px-3 text-sm">OR</span>
          <span className="block w-full h-px bg-gray-300"></span>
        </div>

        <button
          onClick={onGoogleSignIn}
          className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg flex items-center justify-center hover:bg-red-600 focus:ring focus:ring-red-300"
        >
          <FaGoogle className="mr-2" /> Sign in with Google
        </button>

        <p className="text-sm text-center mt-4">
          Don&lsquo;t have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
