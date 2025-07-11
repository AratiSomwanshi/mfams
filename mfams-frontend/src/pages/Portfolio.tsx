import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

interface Transaction {
  id: number;
  type: "BUY" | "SELL";
  units: number;
  mutualFundCode: string;
  mutualFundName: string;
}

interface NAVMap {
  [fundCode: string]: {
    nav: number;
    fundName: string;
  };
}

interface Holding {
  fundCode: string;
  fundName: string;
  totalUnits: number;
  nav: number;
  currentValue: number;
}

function Portfolio() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSell = (fundCode: string) => {
    API.get("/funds")
      .then((res) => {
        const matched = res.data.find((f: any) => f.fundCode === fundCode);
        if (matched) {
          navigate(`/funds/${matched.id}?action=sell`);
        } else {
          alert("Fund not found for selling");
        }
      })
      .catch(() => alert("Failed to fetch fund info"));
  };

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const [txnRes, fundRes] = await Promise.all([
          API.get("/transactions"),
          API.get("/funds"),
        ]);

        const transactions: Transaction[] = txnRes.data;
        const funds = fundRes.data;

        const navMap: NAVMap = {};
        for (const fund of funds) {
          navMap[fund.fundCode] = {
            nav: fund.nav,
            fundName: fund.fundName,
          };
        }

        const unitMap: { [code: string]: number } = {};
        for (const txn of transactions) {
          const { mutualFundCode, units, type } = txn;
          if (!unitMap[mutualFundCode]) {
            unitMap[mutualFundCode] = 0;
          }
          unitMap[mutualFundCode] += type === "BUY" ? units : -units;
        }

        const userHoldings: Holding[] = Object.entries(unitMap)
          .filter(([_, units]) => units > 0)
          .map(([code, totalUnits]) => {
            const navInfo = navMap[code] || { nav: 0, fundName: code };
            return {
              fundCode: code,
              fundName: navInfo.fundName,
              totalUnits,
              nav: navInfo.nav,
              currentValue: totalUnits * navInfo.nav,
            };
          });

        setHoldings(userHoldings);
        setLoading(false);
      } catch (error) {
        console.error("Error loading portfolio", error);
        alert("Failed to load portfolio. Make sure you're logged in.");
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-[#fdf6ec] flex flex-col">
      <Navbar />

      <main className="flex-grow px-6 py-10">
        <h2 className="text-3xl font-extrabold text-pink-800 mb-6 font-serif">
          My Portfolio
        </h2>

        {loading ? (
          <p className="text-gray-700">Loading...</p>
        ) : holdings.length === 0 ? (
          <p className="text-gray-600">You don't have any fund holdings.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4">
            <table className="w-full text-center text-pink-800">
              <thead className="bg-gray-100 text-green-800 font-bold">
                <tr>
                  <th className="p-3">Fund Name</th>
                  <th className="p-3">Units</th>
                  <th className="p-3">NAV</th>
                  <th className="p-3">Current Value</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((h) => (
                  <tr key={h.fundCode} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-semibold">{h.fundName}</td>
                    <td className="p-3 font-semibold">{h.totalUnits}</td>
                    <td className="p-3 font-semibold">₹{h.nav.toFixed(2)}</td>
                    <td className="p-3 font-bold text-green-700">
                      ₹{h.currentValue.toFixed(2)}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleSell(h.fundCode)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded font-semibold"
                      >
                        Sell
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <footer className="bg-pink-900 text-white text-center py-4 text-sm w-full">
        &copy; {new Date().getFullYear()} MFAMS — Mutual Fund Account Management System
      </footer>
    </div>
  );
}

export default Portfolio;
