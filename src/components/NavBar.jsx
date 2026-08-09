import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { GiExpense } from "react-icons/gi";

import { MdDashboard } from "react-icons/md";
var sectionStyle = {
  "font-family": "cursive",
  "font-size": "large",
};
function Navbar() {
  console.log("Navbar rendered");
  const { user, login, logout } = useAuthContext();
  const navigate = useNavigate();
  const userName = user == null ? "GUEST" : user.toUpperCase();

  const checksign = (prop) => {
    if (prop.userName == "GUEST") {
      return "Sign In";
    } else {
      return "Sign Out";
    }
  };

  const getdashboardRoute = (prop) => {
    if (user == null) {
      return "/";
    } else {
      return "/dashboard";
    }
  };
  const signOut = (e) => {
    e.preventDefault();

    if (user == null) {
      navigate("/login");
    } else {
      logout();
      navigate("/");
    }
  };
  return (
    <div>
      <nav class="navbar rounded bg-secondary-subtle me-auto, p-2 border">
        <div class="container-fluid">
          <div className="col-md-4 col-lg-2 d-md-block">
            <Link to={getdashboardRoute(user)} className="navbar-brand ">
              <GiExpense /> Expense Tracker
            </Link>
          </div>
          <span class="navbar-text ms-auto p-2" style={sectionStyle}>
            A budget is telling your money where to go instead of wondering
            where it went
          </span>
          <span class="navbar-text ms-auto p-2">Welcome {userName}</span>
          <button
            class="btn btn-outline-success"
            type="submit"
            onClick={signOut}
          >
            {checksign({ userName })}
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
