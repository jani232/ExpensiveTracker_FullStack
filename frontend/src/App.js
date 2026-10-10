import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Newform from "./Pages/Newform";
import Sidebar from "./Component/Sidebar";
import FilterCategory from "./Pages/FilterCategory";
import Register from "./Pages/Register";
import Login from "./Pages/Login";



function App() {



  return (
    <Router>
      <Sidebar />

      <div className="App">
        <div className="content">
        <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Newform" element={<Newform />} />
          <Route path="/FilterCategory" element={<FilterCategory />} />
        </Routes>
      </div>
</div>
    </Router>
  );
}

export default App;