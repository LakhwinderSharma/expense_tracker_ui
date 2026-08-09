import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { MdCategory } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
function SideBar() {
  console.log("SideBar rendered");
  return (
    <div>
      <nav
        id="sidebarMenu"
        className="col-md-4 col-lg-12 d-md-block bg-light sidebar"
      >
        <div class="position-sticky pt-3 border border-top-0 vh-100 ">
          <ul class="nav flex-column">
            <li class="nav-item ms-2">
              <Link to={"/dashboard"} class="nav-link active  ">
                <MdDashboard /> Dashboard
              </Link>
            </li>
            <li class="nav-item ms-2 ">
              <Link to={"/income"} class="nav-link active ">
                <GiReceiveMoney /> Income
              </Link>
            </li>
            <li class="nav-item ms-2 ">
              <Link to={"/expense"} class="nav-link active ">
                <GiPayMoney /> Expense
              </Link>
            </li>
            <li class="nav-item ms-2 ">
              <Link to={"/dashboard"} class="nav-link active ">
                <MdCategory /> Category
              </Link>
            </li>
            <li class="nav-item border-bottom ms-2 ">
              <Link to={"/dashboard"} class="nav-link active ">
                <TbReportSearch /> Statements
              </Link>
            </li>
            <li class="nav-item ms-2 ">
              <Link to={"/dashboard"} class="nav-link active ">
                <CgProfile /> Profile
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default SideBar;
