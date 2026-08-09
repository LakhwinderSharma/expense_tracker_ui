import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import dashboardImage from "../assets/dashboard.jpg";
import Navbar from "./NavBar";
import SideBar from "./SideBar";
import "../css/dashboard.css";
import { useEffect, useState } from "react";
var sectionStyle = {
  background: "aliceblue",
  display: "flex",
};

function Dashboard() {
  const navigate = useNavigate();
  const { user, login, logout } = useAuthContext();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userName = user == null ? "" : user.toUpperCase();

  useEffect(() => {
    fetchDashBoard();
  }, []);

  const fetchDashBoard = async () => {
    try {
      const response = await fetch("http://localhost:8080/dashboard"); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div id="content-box">
      <div id="content">
        Total Balance ({new Date().toLocaleString("default", { month: "long" })}
        )
        <div id="total-expense" className="amount">
          ₹ {data.balance}
        </div>
        <div id="content-lower">
          I'm a reflection of my bank account. Keep an eye on me.{" "}
        </div>
      </div>
      <div id="content">
        Monthly Income (
        {new Date().toLocaleString("default", { month: "long" })})
        <div id="monthly-income" className="amount">
          ₹ {data.monthlyIncome}
        </div>
        <div id="content-lower">
          The money you make is a symbol of the value you create.
        </div>
      </div>
      <div id="content">
        Monthly Expense (
        {new Date().toLocaleString("default", { month: "long" })})
        <div id="monthly-expense" className="amount">
          ₹ {data.monthlyExpense}
        </div>
        <div id="content-lower">
          Beware of little expenses. A small leak will sink a great ship.
        </div>
      </div>
      <div id="content">
        Savings Rate ({new Date().toLocaleString("default", { month: "long" })})
        <div id="savings-rate" className="amount">
          {data.savingsRate} %
        </div>
        <div id="content-lower">
          Don't save what is left after spending. Instead spend what is left.
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
