import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BarbiePage from "./pages/BarbiePage";
import ProductsPage from "./pages/ProductsPage";
import Navbar from "./components/Navbar";
import CreateProduct from "./pages/CreateProduct";
import { AuthWrapper } from "./context/auth.context";
import EditProductsPage from "./pages/EditProduct";
import BratzPage from "./pages/BratzPage";
import Private from "./components/Private";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {

  
   
  return (
    <>
      <Routes>
       <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
            </>
          }/>
        <Route path="/about" element={<Private><AboutPage  user1={'user1'}/></Private>} />
        <Route path="/barbies" element={<BarbiePage />} />
        <Route path="/bratzs" element={<BratzPage />} />
        <Route path="/products" element={< ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
       <Route path="/edit-product/:id" element={<EditProductsPage />} />
       
       <Route path="/post-products" element={<CreateProduct />} />
      </Routes>
      <footer/>
    </>
  );
}

export default App;
