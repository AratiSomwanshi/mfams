import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600 shadow-md p-4 flex justify-between items-center">
      <div className="text-3xl font-bold tracking-wide text-cyan-200 drop-shadow-sm font-serif">
        MFAMS
      </div>
      <div className="space-x-6 text-sm md:text-base font-medium">
        <Link to="/" className="text-white hover:text-green-300 transition duration-200">Home</Link>
        <Link to="/login" className="text-white hover:text-yellow-300 transition duration-200">Login</Link>
        <Link to="/register" className="text-white hover:text-yellow-300 transition duration-200">Register</Link>
        <Link to="/dashboard" className="text-white hover:text-yellow-300 transition duration-200">Dashboard</Link>
        <Link to="/portfolio" className="text-white hover:text-yellow-300 transition duration-200">Portfolio</Link>
        <Link to="/transactions" className="text-white hover:text-yellow-300 transition duration-200">Transactions</Link>
        <Link to="/funds" className="text-white hover:text-yellow-300 transition duration-200">Funds</Link>
      </div>
    </nav>
  );
}

export default Navbar;
