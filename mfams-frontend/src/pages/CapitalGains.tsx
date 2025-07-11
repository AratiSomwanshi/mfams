import { useEffect, useState } from "react";
import API from "../services/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Navbar from "../components/Navbar";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface GainRecord {
  fundName: string;
  totalBuyAmount: number;
  totalSellAmount: number;
  gain: number;
}

function CapitalGains() {
  const [records, setRecords] = useState<GainRecord[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [txnRes, fundRes] = await Promise.all([
        API.get("/transactions"),
        API.get("/funds"),
      ]);

      const txns = txnRes.data;

      const map: {
        [code: string]: { buy: number; sell: number; fundName: string };
      } = {};

      for (let txn of txns) {
        if (!map[txn.mutualFundCode]) {
          map[txn.mutualFundCode] = {
            buy: 0,
            sell: 0,
            fundName: txn.mutualFundName,
          };
        }

        if (txn.type === "BUY") {
          map[txn.mutualFundCode].buy += txn.amount;
        } else {
          map[txn.mutualFundCode].sell += txn.amount;
        }
      }

      const gains: GainRecord[] = Object.entries(map).map(([_, value]) => ({
        fundName: value.fundName,
        totalBuyAmount: value.buy,
        totalSellAmount: value.sell,
        gain: value.sell - value.buy,
      }));

      setRecords(gains);
    };

    fetchData();
  }, []);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Capital Gains Report", 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);

    autoTable(doc, {
      startY: 30,
      head: [["Fund", "Total Buy", "Total Sell", "Gain"]],
      body: records.map((r) => [
        r.fundName,
        `₹${r.totalBuyAmount.toFixed(2)}`,
        `₹${r.totalSellAmount.toFixed(2)}`,
        `₹${r.gain.toFixed(2)}`,
      ]),
    });

    doc.save("capital_gains.pdf");
  };

  return (
    <div className="w-screen min-h-screen bg-[#fdf6ec] flex flex-col">
      <Navbar />

      <main className="flex-grow px-6 py-10">
        <h2 className="text-3xl font-extrabold text-pink-800 mb-6 font-serif">
          Capital Gains Report
        </h2>

        <div className="bg-white rounded-2xl shadow-lg p-6 w-full">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <p className="text-gray-700 font-medium">
              This report shows your gains across different mutual funds.
            </p>
            <button
              onClick={exportToPDF}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow text-sm"
            >
              Export to PDF
            </button>
          </div>

          {records.length > 0 && (
            <div className="w-full h-96 mb-10">
              <ResponsiveContainer>
                <BarChart data={records}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="fundName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="gain" fill="#38bdf8" name="Gain (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {records.length === 0 ? (
            <p className="text-gray-600 text-center">No data found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-center text-gray-800">
                <thead className="bg-gray-100 text-indigo-800 font-bold">
                  <tr>
                    <th className="p-3">Fund</th>
                    <th className="p-3">Total Buy</th>
                    <th className="p-3">Total Sell</th>
                    <th className="p-3">Gain</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r, i) => (
                    <tr key={i} className="border-t hover:bg-gray-50">
                      <td className="p-3 font-semibold">{r.fundName}</td>
                      <td className="p-3 font-semibold">
                        ₹{r.totalBuyAmount.toFixed(2)}
                      </td>
                      <td className="p-3 font-semibold">
                        ₹{r.totalSellAmount.toFixed(2)}
                      </td>
                      <td
                        className={`p-3 font-bold ${
                          r.gain >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        ₹{r.gain.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-pink-900 text-white text-center py-4 text-sm w-full">
        &copy; {new Date().getFullYear()} MFAMS — Mutual Fund Account Management System
      </footer>
    </div>
  );
}

export default CapitalGains;
