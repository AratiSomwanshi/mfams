import { useEffect, useState } from "react";
import API from "../services/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

interface Transaction {
  id: number;
  type: "BUY" | "SELL";
  units: number;
  amount: number;
  mutualFundCode: string;
  mutualFundName: string;
  transactionDate: string;
}

function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [month, setMonth] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/transactions")
      .then((res) => {
        setTransactions(res.data);
      })
      .catch(() => {
        alert("Error fetching transactions");
      });
  }, []);

  const filteredTxns = transactions.filter((txn) => {
    if (!month) return true;
    const txnMonth = txn.transactionDate.split("-")[1];
    return txnMonth === month;
  });

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(e.target.value);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Transaction Report", 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);

    autoTable(doc, {
      startY: 30,
      head: [["Fund", "Type", "Units", "Amount", "Date"]],
      body: filteredTxns.map((txn) => [
        txn.mutualFundName,
        txn.type,
        txn.units,
        `₹${txn.amount.toFixed(2)}`,
        txn.transactionDate,
      ]),
    });

    doc.save("transactions.pdf");
  };

  return (
    <div className="w-screen min-h-screen bg-[#fdf6ec] flex flex-col">
      <Navbar />

      <main className="flex-grow px-6 py-10">
        <h2 className="text-3xl font-extrabold text-pink-800 mb-6 font-serif">
          Transaction Reports
        </h2>

        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div>
              <label className="font-medium mr-2">Filter by Month:</label>
              <select
                className="border border-green-300 px-3 py-2 rounded-md"
                value={month}
                onChange={handleMonthChange}
              >
                <option value="">All</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>

            <button
              onClick={exportToPDF}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Export to PDF
            </button>

            <button
              onClick={() => navigate("/reports/capital-gains")}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
            >
              View Capital Gains
            </button>
          </div>

          {filteredTxns.length === 0 ? (
            <p className="text-yellow-600">No transactions found for selected month.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-center text-pink-800">
                <thead className="bg-gray-100 text-green-800 font-bold">
                  <tr>
                    <th className="p-3">Fund</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Units</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTxns.map((txn) => (
                    <tr key={txn.id} className="border-t hover:bg-gray-50">
                      <td className="p-3 font-semibold">{txn.mutualFundName}</td>
                      <td className="p-3 font-semibold">{txn.type}</td>
                      <td className="p-3 font-semibold">{txn.units}</td>
                      <td className="p-3 font-semibold">₹{txn.amount.toFixed(2)}</td>
                      <td className="p-3 font-semibold">{txn.transactionDate}</td>
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

export default Transactions;
