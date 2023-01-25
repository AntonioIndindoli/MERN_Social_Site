import { Container, Col, Row } from "react-bootstrap";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import Home from "./Home";
import './App.css';
import FreeComponent from "./FreeComponent";
import AuthComponent from "./AuthComponent";
import ProfileView from "./ProfileView";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
//import ProtectedRoutes from "./ProtectedRoutes";
//import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  const ProtectedRoutes = ({ children }) => {
    let location = useLocation();
    const token = cookies.get("TOKEN");

    // returns route if there is a valid token set in the cookie
    if (!token) {
      return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
  };

  return (
    <Col className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/profile/:user" element={<ProfileView/>} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/free" element={<FreeComponent />} />
        <Route exact path="/auth" element={<ProtectedRoutes><AuthComponent /></ProtectedRoutes>} />
      </Routes>
    </Col >
  );
}

export default App;