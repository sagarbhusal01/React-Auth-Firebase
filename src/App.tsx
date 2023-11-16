import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Home/Home.Main";
import Login from "./Login/Login.Main";
import Register from "./Register/Register.Main";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<Navigate to="/Login" />} />
        </Routes>
      </Router>
    </>
  );
}
