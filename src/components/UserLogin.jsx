import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import loginImage from "../assets/login.jpg";

function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, login, logout } = useAuthContext();
  var sectionStyle = {
    backgroundImage: `url(${loginImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  };
  function handleSignin(e) {
    e.preventDefault();
    // login("lakhwinder");
    // navigate("/dashboard");
    if ("lakhwinder" == username && "daaku" == password) {
      login("lakhwinder");
      navigate("/dashboard");
    } else {
      alert("Sign in failed.");
    }
  }

  function navigateHome(e) {
    e.preventDefault();
    navigate("/");
  }
  return (
    <div
      id="user-login"
      className="container-fluid bg-light w-100 vh-100"
      style={sectionStyle}
    >
      <div className="d-flex justify-content-center">
        <h1>Login</h1>
      </div>
      <div
        className="mx-auto p-5 rounded mb-2 bg-secondary-subtle text-secondary-emphasis"
        style={{ width: "400px" }}
      >
        <div className="d-flex justify-content-center">
          <p>Sign into your account</p>
        </div>
        <div className="d-flex justify-content-center">
          <form onSubmit={(e) => handleSignin(e)}>
            <div className="form-group">
              <label>User Name</label>
              <input
                className="form-control"
                value={username}
                aria-describedby="emailHelp"
                onChange={(e) => setUsername(e.target.value)}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your credentials with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-1">
              <button className="btn btn-secondary" onClick={navigateHome}>
                Back
              </button>
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
