import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components
import Home from "./Routes/Home/Home";
import User from "./Routes/User/User";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
