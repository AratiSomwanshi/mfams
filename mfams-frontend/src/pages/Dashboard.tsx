import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const { role, logout } = useAuth();

  useEffect(() => {
    API.get("/auth/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        alert("Failed to load user profile");
      });
  }, []);

  return (
    <div className="w-screen min-h-screen bg-[#fdf6ec] flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow px-6 py-10 flex flex-col items-center justify-start w-full">
        <h1 className="text-4xl font-bold text-pink-800 font-serif mb-6">
          Welcome to <span className="text-purple-600">MFAMS Dashboard</span>
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-4xl mb-8">
          <h2 className="text-2xl font-semibold text-pink-700 mb-4">My Profile</h2>
          {!user ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <div className="flex items-center gap-6">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
                alt="User Avatar"
                className="w-50 h-40 rounded-full border border-black-300 shadow"
              />
              <div className="text-pink-900 space-y-1 text-2xl ">
                <p><span className="font-semibold text-green-800 text-2xl">Name:</span> {user.username}</p>
                <p><span className="font-semibold text-green-800 text-2xl">Email:</span> {user.email}</p>
                <p><span className="font-semibold text-green-800">Role:</span> {user.role}</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <Link to="/portfolio" className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 text-2xl rounded shadow text-center text-lg font-medium">
            📈 Portfolio
          </Link>
          <Link to="/transactions" className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 text-2xl rounded shadow text-center text-lg font-medium">
            📑 Transaction Report
          </Link>
          <Link to="/funds" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 text-2xl rounded shadow text-center text-lg font-medium">
            💼 Explore Funds
          </Link>
        </div>

        <button
          onClick={logout}
          className="mt-10 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full shadow text-lg"
        >
          Logout
        </button>
      </main>

      <footer className="bg-pink-900 text-white text-center py-4 text-sm w-full">
        &copy; {new Date().getFullYear()} MFAMS — Mutual Fund Account Management System
      </footer>
    </div>
  );
}

export default Dashboard;
