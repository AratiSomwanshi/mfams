import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Transactions from "./pages/Transactions";
import Funds from "./pages/Funds";
import FundAction from "./pages/FundAction";
import CapitalGains from "./pages/CapitalGains"; 
import Home from "./pages/Home";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
        <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/funds" element={<Funds />} />
<Route path="/funds/:id" element={<FundAction />} />
<Route path="/reports/capital-gains" element={<CapitalGains />} />
    </Routes>
  );
}
export default App;
