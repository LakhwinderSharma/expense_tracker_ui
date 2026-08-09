import Navbar from "./NavBar";
import homeimg from "../assets/home-img2.jpg";
import { useAuthContext } from "../context/AuthContext";
function Landing() {
  return (
    <div>
      <Navbar></Navbar>
      <img src={homeimg} class="img-fluid w-100 vh-100" alt="..."></img>
    </div>
  );
}

export default Landing;
