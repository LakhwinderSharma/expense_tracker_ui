import UserLogin from "./components/UserLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Income from "./components/Income";
import Expense from "./components/Expense";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<UserLogin />} />
        <Route
          path="/dashboard"
          element={<Home childComponent={<Dashboard></Dashboard>} />}
        />
        <Route
          path="/income"
          element={<Home childComponent={<Income></Income>} />}
        />
        <Route
          path="/expense"
          element={<Home childComponent={<Expense></Expense>} />}
        />
        <Route path="/default" element={<Landing />} />
        <Route element={<ProtectedRoute />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
