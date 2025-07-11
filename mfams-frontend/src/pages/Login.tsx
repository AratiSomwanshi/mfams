import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import signinImg from "../image/signin-img.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      const token = res.data;
      login(token);
     navigate("/dashboard");

    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-[#fdf6ec] flex flex-col">

      <Navbar />

     
      <main className="flex-grow flex justify-center items-center px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl overflow-hidden">

          <div className="bg-indigo-100 flex flex-col justify-center items-center p-8 text-center">
            <h1 className="text-4xl font-bold text-pink-800 font-serif">
              Dear <span className="text-purple-600">Investor</span>
            </h1>
            <p className="italic text-green-700 mt-2">
              Sign in to experience a wide range of services.
            </p>
            <img src={signinImg} alt="Signin" className="w-72 mb-6 mt-4" />
          </div>

          
          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-pink-700 text-center font-serif mb-6">
              Sign In
            </h2>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition text-lg"
              >
                Login
              </button>
            </form>

            <p className="mt-4 text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-indigo-600 hover:underline cursor-pointer"
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </main>

   
      <footer className="bg-pink-900 text-white text-center py-4 text-sm w-full">
        &copy; {new Date().getFullYear()} MFAMS — Mutual Fund Account Management System
      </footer>
    </div>
  );
}

export default Login;
