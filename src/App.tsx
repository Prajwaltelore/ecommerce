import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { Product } from "./types";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import Orders from "./pages/Orders";

function App() {
  const [cart] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar
            cartCount={cart.length}
            onCartClick={() => setShowCart(!showCart)}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
