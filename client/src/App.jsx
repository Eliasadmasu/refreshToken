import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Protected from "./pages/Protected/Protected";
import Singup from "./pages/SignUp/Singup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/protected" element={<Protected />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
