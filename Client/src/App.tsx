import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import { ProtectedRoute } from "./ProtectedRoute";
import Signup from "./Components/Signup";
import Expense from "./Components/Expense";
import ExpenseList from "./Components/ExpenseList";
import Investment from "./Components/Investment";
import Layout from "./Layout";
import InvestmentList from "./Components/InvestmentList";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/expense" element={<Expense />} />
              <Route path="/expense-list" element={<ExpenseList />} />
              <Route path="/investment" element={<Investment />} />
              <Route path="/investment-list" element={<InvestmentList />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
