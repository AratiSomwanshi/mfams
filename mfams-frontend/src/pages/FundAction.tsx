import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function FundAction() {
  const { id } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const action = new URLSearchParams(search).get("action"); // 'buy' or 'sell'

  const [units, setUnits] = useState(1);
  const [fundCode, setFundCode] = useState("");
  const [fundName, setFundName] = useState("");

  useEffect(() => {
    if (!id) return;
    API.get(`/funds/${id}`)
      .then((res) => {
        setFundName(res.data.fundName);
        setFundCode(res.data.fundCode);
      })
      .catch(() => alert("Failed to load fund"));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!action || !["buy", "sell"].includes(action)) {
      alert("Invalid action");
      return;
    }

    try {
      await API.post(`/transactions/${action}`, {
        fundCode,
        units,
      });
      alert(`${action.toUpperCase()} successful!`);
      navigate("/portfolio");
    } catch (err: any) {
      if (err?.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert(`${action.toUpperCase()} failed`);
      }
    }
  };

  return (
    <div className="w-screen min-h-screen bg-[#fdf6ec] flex flex-col">
      <Navbar />

      <main className="flex-grow flex justify-center items-center px-4 py-10">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-pink-700 mb-6 font-serif">
            {action === "buy" ? "Buy Units" : "Sell Units"}
          </h2>
          <p className="text-center text-green-600 mb-4 font-medium">
            Fund: <span className="font-semibold">{fundName}</span>
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="number"
              min="1"
              value={units}
              onChange={(e) => setUnits(parseInt(e.target.value))}
              className="w-full border border-green-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter number of units"
              required
            />
            <button
              type="submit"
              className={`w-full py-2 text-white text-lg rounded-md transition ${
                action === "buy"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {action === "buy" ? "Buy" : "Sell"}
            </button>
          </form>
        </div>
      </main>

      <footer className="bg-pink-900 text-white text-center py-4 text-sm w-full">
        &copy; {new Date().getFullYear()} MFAMS — Mutual Fund Account Management System
      </footer>
    </div>
  );
}

export default FundAction;
