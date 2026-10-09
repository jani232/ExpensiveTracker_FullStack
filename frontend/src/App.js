import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Newform from "./Pages/Newform";
import Sidebar from "./Component/Sidebar";
import FilterCategory from "./Pages/FilterCategory";

function App() {
  return (
    <Router>
      <Sidebar />

      <div className="App">
        <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Newform" element={<Newform />} />
          <Route path="/FilterCategory" element={<FilterCategory />} />
        </Routes>
      </div>
</div>
    </Router>
  );
}

export default App;