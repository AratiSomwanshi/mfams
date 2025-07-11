import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import buyAndSellImg from "../image/buyandsell.jpg";
import report from "../image/report.jpg";
import tracking from "../image/tracking.jpg";
function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-screen min-h-screen bg-[#fdf6ec] flex flex-col">
      <Navbar />

      <main className="flex-grow w-full flex flex-col items-center justify-center px-4">
        <section className="w-full max-w-7xl text-center py-16">
          <div className="bg-white rounded-2xl shadow-lg p-10 mx-auto w-full">
            <h1 className="text-5xl font-extrabold text-pink-800 font-serif mb-4">
              Welcome to MFAMS
            </h1>
            <p className="text-green-700 text-lg italic mb-6">
              Your Mutual Fund Portfolio Manager
            </p>
            <button
              onClick={() => navigate("/register")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full shadow-md"
            >
              Get Started
            </button>
          </div>
        </section>

        <section className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 px-4 pb-16">
        
         <div className="bg-white rounded-xl shadow-md w-full overflow-hidden">
           <img
    src={tracking}
    alt="Buy and Sell"
    className="w-full h-40 object-cover"
  />
   <div className="p-6">
            <h3 className="text-xl font-semibold text-purple-700 mb-2">
              Track Your Investments
            </h3>
            <p className="text-green-600">
              Review your portfolio, units, and NAV values in real-time.
            </p>
          </div></div>
        <div className="bg-white rounded-xl shadow-md w-full overflow-hidden">
  <img
    src={buyAndSellImg}
    alt="Buy and Sell"
    className="w-full h-40 object-cover"
  />
  <div className="p-6">
    <h3 className="text-xl font-semibold text-purple-700 mb-2">
      Buy & Sell Mutual Funds
    </h3>
    <p className="text-green-600">
      Seamlessly invest in or redeem your mutual funds.
    </p>
  </div>
</div>

          <div className="bg-white rounded-xl shadow-md p-6 w-full">
            <img
    src={report}
    alt="Buy and Sell"
    className="w-full h-40 object-cover"
  />
            <div className="p-6">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
              Download Reports
            </h3>
            <p className="text-green-600">
              Export your transactions and capital gains as PDF.
            </p>
          </div></div>
        </section>
      </main>

      <footer className="bg-pink-900 text-white text-center py-4 text-sm w-full">
        &copy; {new Date().getFullYear()} MFAMS — Mutual Fund Account Management System
      </footer>
    </div>
  );
}

export default Home;
