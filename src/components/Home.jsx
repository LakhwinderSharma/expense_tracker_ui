import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import dashboardImage from "../assets/dashboard.jpg";
import Navbar from "./NavBar";
import SideBar from "./SideBar";
import "../css/home.css";
import Dashboard from "./Dashboard";
var sectionStyle = {
  background: "aliceblue",
  display: "flex",
};

function Home({ childComponent }) {
  console.log("Home rendered");
  const navigate = useNavigate();
  const { user, login, logout } = useAuthContext();

  const userName = user == null ? "" : user.toUpperCase();

  return (
    <div>
      <Navbar></Navbar>
      <div id="grid-container">
        <div>
          <SideBar></SideBar>
        </div>
        <div id="content-container">{childComponent}</div>
      </div>
    </div>
  );
}

export default Home;
