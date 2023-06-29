import { Routes, Route,Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import Home from "./components/Home/index";
import Products from "./components/Products/index";
import ProductItemDetails from "./components/ProductItemDetails";
import Cart from "./components/Cart/index";
import Login from "./components/Login";
import NotFound from './components/NotFound/index'
import "./App.css";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={Cookies.get("jwt_token") ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/products" element={Cookies.get("jwt_token") ? <Products /> : <Navigate to="/login" replace />} />
        <Route path="/products/:id" element={Cookies.get("jwt_token") ? <ProductItemDetails /> : <Navigate to="/login" replace />} />
        <Route path="/cart" element={Cookies.get("jwt_token") ? <Cart /> : <Navigate to="/login" replace />} />
        <Route path="*" element={Cookies.get("jwt_token") ? <NotFound /> : <Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

export default App;
