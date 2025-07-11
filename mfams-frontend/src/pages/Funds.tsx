import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
interface Fund {
  id: number;
  fundName: string;
  nav: number;
  fundCode: string;
  description?: string;
}

function Funds() {
  const [funds, setFunds] = useState<Fund[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/funds")
      .then((res) => {
        console.log("Funds API response:", res.data);
        setFunds(res.data);
      })
      .catch((error) => {
        console.error("Failed to load funds", error);
        setFunds(null);
        alert("Failed to load funds. Please ensure you're logged in.");
      });
  }, []);

  const handleBuy = (id: number) => navigate(`/funds/${id}?action=buy`);

  return (
    <div className="w-screen min-h-screen bg-[#fdf6ec] flex flex-col">
       <Navbar />
        <main className="flex-grow px-6 py-10">
      <h2 className="text-3xl font-extrabold text-pink-800 mb-6 font-serif">Available Mutual Funds</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.isArray(funds) ? (
          funds.length === 0 ? (
            <p className="text-green-600">No funds available.</p>
          ) : (
            funds.map((fund) => (
              <div key={fund.id} className="border p-4 shadow rounded">
                <h3 className="bg-gray-100 text-pink-800 font-bold">{fund.fundName}</h3>
                <p className="text-green-600">NAV: ₹{fund.nav}</p>
                {fund.description && (
                  <p className="text-sm mb-2">{fund.description}</p>
                )}
                <button
                  onClick={() => handleBuy(fund.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Buy
                </button>
              </div>
            ))
          )
        ) : (
          <p className="text-red-500">⚠️ Failed to load funds. Try again.</p>
        )}
      </div>
      </main>
        <footer className="bg-pink-900 text-white text-center py-4 text-sm w-full">
        &copy; {new Date().getFullYear()} MFAMS — Mutual Fund Account Management System
      </footer>
    </div>
  );
}

export default Funds;
