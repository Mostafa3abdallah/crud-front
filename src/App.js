import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ProductList from "./pages/ProductList"
import ProductCreate from "./pages/ProductCreate"
import ProductEdit from "./pages/ProductEdit"
import ProductShow from "./pages/ProductShow"
import Login from "./pages/Login"
import Registration from "./pages/Registration"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Registration />} />
        <Route exact path="/dashboard" element={<ProductList />} />
        <Route path="/create" element={<ProductCreate />} />
        <Route path="/edit/:id" element={<ProductEdit />} />
        <Route path="/show/:id" element={<ProductShow />} />
      </Routes>
    </Router>
  );
}

export default App;